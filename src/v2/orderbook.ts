import { getAddress } from '@ethersproject/address'
import { NowRequest, NowResponse } from '@now/node'
import { BigNumber } from '@uniswap/sdk'

import { getReserves } from './_shared'
import { return200, return400, return500 } from '../utils'

function computeSwapResult(
  amountIn: BigNumber,
  reserveIn: BigNumber,
  reserveOut: BigNumber
): { price: string; reserveInAfter: BigNumber; reserveOutAfter: BigNumber } {
  const amountOut = reserveOut.multipliedBy(reserveIn).dividedBy(reserveIn.plus(amountIn.multipliedBy(0.997)))
  return {
    price: amountIn.dividedBy(amountOut).toString(),
    reserveInAfter: reserveIn.plus(amountIn),
    reserveOutAfter: reserveOut.minus(amountOut)
  }
}

function computeBids(reserveIn: BigNumber, reserveOut: BigNumber, numSegments: number): [string, string][] {
  const increment = reserveIn.dividedBy(numSegments)
  const amountsIn = Array.from({ length: numSegments }, (x, i): BigNumber => increment.multipliedBy(i + 1))
  return amountsIn.map((amountIn): [string, string] => {
    const { reserveInAfter, reserveOutAfter } = computeSwapResult(amountIn.minus(increment), reserveIn, reserveOut)
    const { price } = computeSwapResult(increment, reserveInAfter, reserveOutAfter)
    return [increment.toString(), price]
  })
}

function computeBidsAsks(
  reservesA: BigNumber,
  reservesB: BigNumber,
  numSegments: number = 20
): { bids: [string, string][]; asks: [string, string][] } {
  if (reservesA.eq(0) || reservesB.eq(0)) {
    return {
      bids: [],
      asks: []
    }
  }

  return {
    bids: computeBids(reservesA, reservesB, numSegments),
    asks: computeBids(reservesB, reservesA, numSegments)
  }
}

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
    const [reservesA, reservesB] = await getReserves(idA, idB)

    const timestamp = new Date().getTime()

    return200(
      res,
      {
        timestamp,
        ...computeBidsAsks(new BigNumber(reservesA), new BigNumber(reservesB))
      },
      60 * 15
    )
  } catch (error) {
    return500(res, error)
  }
}
