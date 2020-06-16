import { getAddress } from '@ethersproject/address'
import { NowRequest, NowResponse } from '@now/node'

import { getTopPairs, Pair } from './_shared'
import { return200, return500 } from '../utils'

interface ReturnShape {
  [tokenAddress: string]: { id: string; name: string; symbol: string; maker_fee: '0'; taker_fee: '0.003' }
}

export default async function(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const pairs = await getTopPairs(false)
    const tokens = pairs.reduce<{
      [tokenAddress: string]: { id: string; name: string; symbol: string; maker_fee: '0'; taker_fee: '0.003' }
    }>((memo: ReturnShape, pair: Pair): ReturnShape => {
      for (let token of [pair.token0, pair.token1]) {
        const id = getAddress(token.id)
        if (memo[id]) continue
        memo[id] = {
          id,
          name: token.name,
          symbol: token.symbol,
          maker_fee: '0',
          taker_fee: '0.003'
        }
      }
      return memo
    }, {})
    return200(res, tokens, 60 * 60 * 24)
  } catch (error) {
    return500(res, error)
  }
}
