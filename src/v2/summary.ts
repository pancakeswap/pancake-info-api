import { getAddress } from '@ethersproject/address'
import { NowRequest, NowResponse } from '@now/node'

import { return200, return500 } from '../utils'
import { getTopPairs } from './_shared'

interface ReturnShape {
  [tokenIds: string]: { last_price: string; base_volume: string; quote_volume: string }
}

export default async function(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const pairs = await getTopPairs(true)

    return200(
      res,
      pairs.reduce<ReturnShape>((accumulator, pair, i): any => {
        const id0 = getAddress(pair.token0.id)
        const id1 = getAddress(pair.token1.id)
        accumulator[`${id0}_${id1}`] = {
          last_price: pair.token0Price,
          base_volume: pair.volumeToken0,
          quote_volume: pair.volumeToken1
        }
        // do not want to double count volume
        // accumulator[`${id1}_${id0}`] = {
        //   last_price: pair.token1Price,
        //   base_volume: pair.volumeToken1,
        //   quote_volume: pair.volumeToken0
        // }
        return accumulator
      }, {}),
      60 * 15 // cache for 15 minutes
    )
  } catch (error) {
    return500(res, error)
  }
}
