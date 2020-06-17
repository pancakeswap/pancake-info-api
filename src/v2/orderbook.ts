import { getAddress } from '@ethersproject/address'
import { NowRequest, NowResponse } from '@now/node'
import { BigNumber } from '@uniswap/sdk'

import { getReserves } from './_shared'
import { return200, return400, return500 } from '../utils'

function getAmountOut(
  amountIn: BigNumber,
  reserveIn: BigNumber,
  reserveOut: BigNumber
): { amountOut: BigNumber; reservesInAfter: BigNumber; reservesOutAfter: BigNumber } {
  const amountOut = amountIn.eq(0)
    ? new BigNumber(0)
    : reserveOut.minus(reserveOut.multipliedBy(reserveIn).dividedBy(reserveIn.plus(amountIn.multipliedBy(0.997))))
  return {
    amountOut,
    reservesInAfter: reserveIn.plus(amountIn),
    reservesOutAfter: reserveOut.minus(amountOut)
  }
}

function getAmountIn(
  amountOut: BigNumber,
  reserveIn: BigNumber,
  reserveOut: BigNumber
): { amountIn: BigNumber; reservesInAfter: BigNumber; reservesOutAfter: BigNumber } {
  const amountIn = amountOut.eq(0)
    ? new BigNumber(0)
    : amountOut.isGreaterThanOrEqualTo(amountOut)
    ? new BigNumber(Infinity)
    : reserveIn
        .multipliedBy(reserveOut)
        .dividedBy(reserveOut.minus(amountOut)) // reserves in after
        .minus(reserveIn) // minus reserves in
        .dividedBy(0.997) // fee

  return {
    amountIn,
    reservesInAfter: reserveIn.plus(amountIn),
    reservesOutAfter: reserveOut.minus(amountOut)
  }
}

function computeBidsAsks(
  baseReserves: BigNumber,
  quoteReserves: BigNumber,
  numSegments: number = 20
): { bids: [string, string][]; asks: [string, string][] } {
  if (baseReserves.eq(0) || quoteReserves.eq(0)) {
    return {
      bids: [],
      asks: []
    }
  }

  const increment = baseReserves.dividedBy(numSegments)
  const baseAmounts = Array.from({ length: numSegments }, (x, i): BigNumber => increment.multipliedBy(i))
  const bids = baseAmounts.map((buyBaseAmount): [string, string] => {
    const { reservesInAfter: baseReservesBefore, reservesOutAfter: quoteReservesBefore } = getAmountOut(
      buyBaseAmount,
      baseReserves,
      quoteReserves
    )
    const { amountOut } = getAmountOut(increment, baseReservesBefore, quoteReservesBefore)
    return [increment.toString(), amountOut.dividedBy(increment).toString()]
  })

  const asks = baseAmounts.map((sellBaseAmount): [string, string] => {
    const { reservesInAfter: baseReservesBefore, reservesOutAfter: quoteReservesBefore } = getAmountIn(
      sellBaseAmount,
      baseReserves,
      quoteReserves
    )
    const { amountIn } = getAmountIn(increment, baseReservesBefore, quoteReservesBefore)
    return [increment.toString(), increment.dividedBy(amountIn).toString()]
  })

  return {
    bids,
    asks
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
