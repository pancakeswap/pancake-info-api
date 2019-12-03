import { NowRequest, NowResponse } from '@now/node'

import { getTopPairsData } from './_shared'
import { return200, return500 } from '../_utils'

export default async function(_: NowRequest, res: NowResponse): Promise<NowResponse> {
  return await getTopPairsData()
    .then(
      ([topPairs, topPairsData]): NowResponse => {
        return return200(
          res,
          topPairs.reduce((accumulator: any, _: any, i): any => {
            const pair = topPairs[i]
            const pairData = topPairsData[i]

            accumulator[pair.tokenAddress] = {
              ...(pair.tokenName ? { name: pair.tokenName } : {}),
              ...(pair.tokenSymbol ? { symbol: pair.tokenSymbol } : {}),
              exchange_address: pair.exchangeAddress,
              last_price: pairData.price,
              base_volume: pairData.tradeVolumeEth,
              quote_volume: pairData.tradeVolumeToken
            }
            return accumulator
          }, {}),
          60 * 60 // cache for 1 hour
        )
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
