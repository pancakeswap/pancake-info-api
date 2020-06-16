import { getAddress } from '@ethersproject/address'
import { NowRequest, NowResponse } from '@now/node'

import { return200, return500 } from '../utils'
import { getTopPairs } from './_shared'

interface ReturnShape {
  [tokenIds: string]: {
    base_name: string
    base_symbol: string
    base_id: string
    quote_name: string
    quote_symbol: string
    quote_id: string // exchange address
    last_price: string
    base_volume: string
    quote_volume: string
  }
}

export default async function(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const pairs = await getTopPairs(true)
    return200(
      res,
      pairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
        const id0 = getAddress(pair.token0.id)
        const id1 = getAddress(pair.token1.id)

        accumulator[`${id0}_${id1}`] = {
          base_id: id0,
          base_name: pair.token0.name,
          base_symbol: pair.token0.symbol,
          quote_id: id1,
          quote_name: pair.token1.name,
          quote_symbol: pair.token1.symbol,
          last_price: pair.token1Price, // token1Price is token1/token0 unfortunately
          base_volume: pair.volumeToken0,
          quote_volume: pair.volumeToken1
        }

        return accumulator
      }, {}),
      60 * 15 // cache for 15 minutes
    )
  } catch (error) {
    return500(res, error)
  }
}
