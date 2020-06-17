import { BigNumber } from '@uniswap/sdk'

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
    : amountOut.isGreaterThanOrEqualTo(reserveOut)
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
      baseReserves,
      quoteReserves
    )
    const { amountIn } = getAmountIn(increment, baseReservesBefore, quoteReservesBefore)
    return [increment.toString(), amountIn.dividedBy(increment).toString()]
  })

  return {
    bids,
    asks
  }
}
