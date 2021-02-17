import { NowRequest, NowResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../utils";
import { return200, return500 } from "../utils/response";

interface ReturnShape {
  [tokenAddress: string]: { name: string; symbol: string; maker_fee: number; taker_fee: number };
}

export default async function (req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const pairs = await getTopPairs();
    const tokens = pairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
      for (const token of [pair.token0, pair.token1]) {
        const id = getAddress(token.id);
        if (accumulator[id]) continue;
        accumulator[id] = {
          name: token.name,
          symbol: token.symbol,
          maker_fee: 0,
          taker_fee: 0.002,
        };
      }

      return accumulator;
    }, {});
    return200(res, tokens);
  } catch (error) {
    return500(res, error);
  }
}
