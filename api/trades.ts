import { NowRequest, NowResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import BigNumber from "bignumber.js";
import { getSwaps } from "../utils";
import { return200, return400, return500 } from "../utils/response";

export default async function (req: NowRequest, res: NowResponse): Promise<void> {
  if (
    !req.query.pair ||
    typeof req.query.pair !== "string" ||
    !/^0x[0-9a-fA-F]{40}_0x[0-9a-fA-F]{40}$/.test(req.query.pair)
  ) {
    return400(res, "Invalid pair identifier: must be of format tokenAddress_tokenAddress");
    return;
  }

  const [tokenA, tokenB] = req.query.pair.split("_");
  let idA: string, idB: string;
  try {
    [idA, idB] = [getAddress(tokenA), getAddress(tokenB)];
  } catch (error) {
    return400(res);
    return;
  }

  try {
    const swaps = await getSwaps(idA, idB);

    return200(
      res,
      swaps.map((swap) => {
        const aIn = swap.amountAIn !== "0";
        const aOut = swap.amountAOut !== "0";
        const bIn = swap.amountBIn !== "0";
        const bOut = swap.amountBOut !== "0";

        // a is the base so if the pair sends a and not b then it's a 'buy'
        const isBuy = aOut && bIn && !aIn && !bOut;
        const isSell = !aOut && !bIn && aIn && bOut;

        const type = isBuy ? "buy" : isSell ? "sell" : "unknown";
        const baseAmount = aOut ? swap.amountAOut : swap.amountAIn;
        const quoteAmount = bOut ? swap.amountBOut : swap.amountBIn;
        return {
          trade_id: swap.id,
          base_volume: baseAmount,
          quote_volume: quoteAmount,
          type,
          trade_timestamp: swap.timestamp,
          price:
            baseAmount !== "0" ? new BigNumber(quoteAmount).dividedBy(new BigNumber(baseAmount)).toNumber() : undefined,
        };
      })
    );
  } catch (error) {
    return500(res, error);
  }
}
