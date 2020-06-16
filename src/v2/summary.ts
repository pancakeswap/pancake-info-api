import { NowRequest, NowResponse } from '@now/node'

import { return200, return500 } from '../utils'
import { getTopPairs } from './_shared'

interface ReturnShape {
  [pairAddress: string]: { last_price: string; base_volume: string; quote_volume: string }
}

export default async function(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const pairs = await getTopPairs(true)

    return200(
      res,
      pairs.reduce<ReturnShape>((accumulator, pair, i): any => {
        accumulator[`${pair.token0.id}_${pair.token1.id}`] = {
          last_price: pair.token0Price + '',
          base_volume: pair.volumeToken0,
          quote_volume: pair.volumeToken1
        }
        accumulator[`${pair.token1.id}_${pair.token0.id}`] = {
          last_price: pair.token1Price + '',
          base_volume: pair.volumeToken1,
          quote_volume: pair.volumeToken0
        }
        return accumulator
      }, {}),
      60 * 15 // cache for 15 minutes
    )
  } catch (error) {
    return500(res, error)
  }
}
