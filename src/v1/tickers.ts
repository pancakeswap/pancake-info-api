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
              base_name: 'Ether',
              base_symbol: 'ETH',
              base_id: 'ETH',
              ...(pair.tokenName ? { quote_name: pair.tokenName } : {}),
              ...(pair.tokenSymbol ? { quote_symbol: pair.tokenSymbol } : {}),
              quote_id: pair.exchangeAddress,
              quote_token_address: pair.tokenAddress,
              last_price: pairData.price,
              base_volume: pairData.tradeVolumeEth,
              quote_volume: pairData.tradeVolumeToken
            }
            // hard-code SAI
            if (pair.tokenAddress === '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359') {
              accumulator[`ETH_${pair.exchangeAddress}`] = {
                ...accumulator[`ETH_${pair.exchangeAddress}`],
                quote_name: 'Sai Stablecoin v1.0',
                quote_symbol: 'SAI'
              }
            }
            return accumulator
          }, {}),
          60 * 15 // cache for 15 minutes
        )
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
