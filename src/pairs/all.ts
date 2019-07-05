import { NowRequest, NowResponse } from '@now/node'

import client from '../_apollo/client'
import { ALL_PAIRS } from '../_apollo/queries'
import { return200, return500 } from '../_shared'
import { get24HoursAgo, get24HourPairData } from './_shared'
import { PairDatas, PairData } from './types'

interface ErrorWrapper {
  error: Error
}

function isErrorWrapper(e: any | ErrorWrapper): e is ErrorWrapper {
  return !!(e as ErrorWrapper).error
}

export default async function(_: NowRequest, res: NowResponse): Promise<NowResponse> {
  const tokenAddresses: string[] | ErrorWrapper = await client
    .query({ query: ALL_PAIRS })
    .then(({ data: { exchanges } }): string[] => exchanges.map(({ tokenAddress }: any): string => tokenAddress))
    .catch((error): ErrorWrapper => ({ error }))

  if (isErrorWrapper(tokenAddresses)) {
    return return500(res, tokenAddresses.error)
  }

  const _24HoursAgo = get24HoursAgo()

  return await Promise.all(
    tokenAddresses.map((tokenAddress): Promise<PairData> => get24HourPairData(tokenAddress, _24HoursAgo))
  )
    .then(
      (pairDatas): NowResponse => {
        const returnData: PairDatas = {
          pairs: pairDatas,
          pairs_count: pairDatas.length
        }
        return return200(res, returnData)
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
