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

            accumulator[`ETH_${pair.exchangeAddress}`] = {
              last_price: pairData.price,
              base_volume: pairData.tradeVolumeEth,
              quote_volume: pairData.tradeVolumeToken
            }
            return accumulator
          }, {}),
          60 * 15 // cache for 15 minutes
        )
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
