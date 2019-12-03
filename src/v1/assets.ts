import { NowRequest, NowResponse } from '@now/node'

import { getTopPairs } from './_shared'
import { return200, return500 } from '../_utils'

const BLACKLIST = [
  '0xb8c77482e45f1f44de1745f52c74426c631bdd52', // BNB
  '0x55296f69f40ea6d20e478533c15a6b08b654e758' // XYO
]

export default async function(_: NowRequest, res: NowResponse): Promise<NowResponse> {
  return await getTopPairs()
    .then(
      (topPairs): NowResponse =>
        return200(
          res,
          {
            ETH: {
              name: 'Ether',
              symbol: 'ETH',
              id: 'ETH',
              maker_fee: '0',
              taker_fee: '0.003'
            },
            ...topPairs
              .filter((pair): boolean => !BLACKLIST.includes(pair.tokenAddress.toLowerCase()))
              .reduce((accumulator: any, pair): any => {
                accumulator[pair.tokenAddress] = {
                  ...(pair.tokenName ? { name: pair.tokenName } : {}),
                  ...(pair.tokenSymbol ? { symbol: pair.tokenSymbol } : {}),
                  id: pair.exchangeAddress,
                  maker_fee: '0',
                  taker_fee: '0.003'
                }
                return accumulator
              }, {})
          },
          60 * 60 * 24 // cache for 1 day
        )
    )
    .catch((error): NowResponse => return500(res, error))
}
