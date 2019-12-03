import { NowRequest, NowResponse } from '@now/node'

import { getTopPairs } from './_shared'
import { return200, return500 } from '../_utils'

export default async function(_: NowRequest, res: NowResponse): Promise<NowResponse> {
  return await getTopPairs()
    .then(
      (topPairs): NowResponse =>
        return200(
          res,
          topPairs.reduce((accumulator: any, pair): any => {
            accumulator[pair.tokenAddress] = {
              ...(pair.tokenName ? { name: pair.tokenName } : {}),
              ...(pair.tokenSymbol ? { symbol: pair.tokenSymbol } : {}),
              exchange_address: pair.exchangeAddress
            }
            return accumulator
          }, {}),
          60 * 60 * 24 // cache for 1 day
        )
    )
    .catch((error): NowResponse => return500(res, error))
}
