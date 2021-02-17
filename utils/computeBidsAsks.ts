import BigNumber from "bignumber.js";

function getAmountOut(
  amountIn: BigNumber,
  reservesIn: BigNumber,
  reservesOut: BigNumber
): { amountOut: BigNumber; reservesInAfter: BigNumber; reservesOutAfter: BigNumber } {
  const amountOut = amountIn.eq(0)
    ? new BigNumber(0)
    : reservesOut.minus(reservesOut.multipliedBy(reservesIn).dividedBy(reservesIn.plus(amountIn.multipliedBy(0.998))));
  return {
    amountOut,
    reservesInAfter: reservesIn.plus(amountIn),
    reservesOutAfter: reservesOut.minus(amountOut),
  };
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
        .dividedBy(0.998); // fee

  return {
    amountIn,
    reservesInAfter: reservesIn.plus(amountIn),
    reservesOutAfter: reservesOut.minus(amountOut),
  };
}

export function computeBidsAsks(
  baseReserves: BigNumber,
  quoteReserves: BigNumber,
  numSegments = 200
): { bids: [number, number][]; asks: [number, number][] } {
  if (baseReserves.eq(0) || quoteReserves.eq(0)) {
    return {
      bids: [],
      asks: [],
    };
  }

  // we don't do exactly 100 segments because we do not care about the trade that takes exact out of entire reserves
  const increment = baseReserves.dividedBy(numSegments + 1);
  const baseAmounts = Array.from({ length: numSegments }, (x, i): BigNumber => increment.multipliedBy(i));

  const bids = baseAmounts.map((buyBaseAmount): [number, number] => {
    const { reservesInAfter: baseReservesBefore, reservesOutAfter: quoteReservesBefore } = getAmountOut(
      buyBaseAmount,
      baseReserves,
      quoteReserves
    );
    const { amountOut } = getAmountOut(increment, baseReservesBefore, quoteReservesBefore);
    return [increment.toNumber(), amountOut.dividedBy(increment).toNumber()];
  });

  const asks = baseAmounts.map((sellBaseAmount): [number, number] => {
    const { reservesInAfter: baseReservesBefore, reservesOutAfter: quoteReservesBefore } = getAmountIn(
      sellBaseAmount,
      quoteReserves,
      baseReserves
    );
    const { amountIn } = getAmountIn(increment, baseReservesBefore, quoteReservesBefore);
    return [increment.toNumber(), amountIn.dividedBy(increment).toNumber()];
  });

  return {
    bids,
    asks,
  };
}
