import { BigNumber } from '@uniswap/sdk'

function getAmountOut(
  amountIn: BigNumber,
  reservesIn: BigNumber,
  reservesOut: BigNumber
): { amountOut: BigNumber; reservesInAfter: BigNumber; reservesOutAfter: BigNumber } {
  const amountOut = amountIn.eq(0)
    ? new BigNumber(0)
    : reservesOut.minus(reservesOut.multipliedBy(reservesIn).dividedBy(reservesIn.plus(amountIn.multipliedBy(0.997))))
  return {
    amountOut,
    reservesInAfter: reservesIn.plus(amountIn),
    reservesOutAfter: reservesOut.minus(amountOut)
  }
}

function getAmountIn(
  amountOut: BigNumber,
  reservesIn: BigNumber,
  reservesOut: BigNumber
): { amountIn: BigNumber; reservesInAfter: BigNumber; reservesOutAfter: BigNumber } {
  const amountIn = amountOut.eq(0)
    ? new BigNumber(0)
    : amountOut.isGreaterThanOrEqualTo(reservesOut)
    ? new BigNumber(Infinity)
    : reservesIn
        .multipliedBy(reservesOut)
        .dividedBy(reservesOut.minus(amountOut)) // reserves in after
        .minus(reservesIn) // minus reserves in
        .dividedBy(0.997) // fee

  return {
    amountIn,
    reservesInAfter: reservesIn.plus(amountIn),
    reservesOutAfter: reservesOut.minus(amountOut)
  }
}

export function computeBidsAsks(
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
      quoteReserves,
      baseReserves
    )
    const { amountIn } = getAmountIn(increment, quoteReservesBefore, baseReservesBefore)
    return [increment.toString(), increment.dividedBy(amountIn).toString()]
  })

  return {
    bids,
    asks
  }
}
