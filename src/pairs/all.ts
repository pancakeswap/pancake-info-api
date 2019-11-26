import { NowRequest, NowResponse } from '@now/node'

import { return200, return500 } from '../_utils'
import { getAllPairs, get24HoursAgo, get24HourPairData } from './_shared'
import { PairDatas, PairData } from './_types'

export default async function(_: NowRequest, res: NowResponse): Promise<NowResponse> {
  let tokens: any[]
  try {
    tokens = await getAllPairs()
  } catch (error) {
    return return500(res, error)
  }

  const _24HoursAgo = get24HoursAgo()

  return Promise.all(
    tokens.map(
      ({ tokenAddress, exchangeAddress }): Promise<PairData> =>
        get24HourPairData(tokenAddress, exchangeAddress, _24HoursAgo)
    )
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
