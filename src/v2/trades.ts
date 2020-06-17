import { getAddress } from '@ethersproject/address'
import { NowRequest, NowResponse } from '@now/node'
import { BigNumber } from '@uniswap/sdk'

import { getSwaps } from './_shared'
import { return200, return400, return500 } from '../utils'

export default async function(req: NowRequest, res: NowResponse): Promise<void> {
  if (
    !req.query.pair ||
    typeof req.query.pair !== 'string' ||
    !/^0x[0-9a-fA-F]{40}_0x[0-9a-fA-F]{40}$/.test(req.query.pair)
  ) {
    return400(res, 'Invalid pair identifier: must be of format tokenAddress_tokenAddress')
    return
  }

  const [tokenA, tokenB] = req.query.pair.split('_')
  let idA: string, idB: string
  try {
    ;[idA, idB] = [getAddress(tokenA), getAddress(tokenB)]
  } catch (error) {
    return400(res)
    return
  }

  try {
    const swaps = await getSwaps(idA, idB)

    return200(
      res,
      swaps.map(swap => {
        const aOut = swap.amountAOut !== '0'
        const bOut = swap.amountBOut !== '0'
        // a is the base
        // swapping out the base === buying
        const type = aOut && bOut ? 'flash' : aOut ? 'buy' : bOut ? 'sell' : 'unknown'
        const baseAmount = aOut ? swap.amountAOut : swap.amountAIn
        const qouteAmount = bOut ? swap.amountBOut : swap.amountBIn
        return {
          trade_id: swap.id,
          base_volume: baseAmount,
          quote_volume: qouteAmount,
          type,
          trade_timestamp: swap.timestamp,
          price:
            baseAmount !== '0' ? new BigNumber(qouteAmount).dividedBy(new BigNumber(baseAmount)).toString() : undefined
        }
      }),
      // trades.map((trades): any => ({
      //   trade_id: trades.id,
      //   price: trades.price,
      //   base_volume: trades.ethAmount,
      //   quote_volume: trades.tokenAmount,
      //   trade_timestamp: trades.timestamp,
      //   type: trades.type
      // })),
      60 * 15 // cache for 15 minutes
    )
  } catch (error) {
    return500(res, error)
  }
}
