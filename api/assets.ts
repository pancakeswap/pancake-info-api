import { NowRequest, NowResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import { getBundle, getTopPairs } from "../utils";
import { return200, return500 } from "../utils/response";
import BigNumber from "bignumber.js";

interface ReturnShape {
  [tokenAddress: string]: { name: string; symbol: string; last_price: number; maker_fee: number; taker_fee: number };
}

export default async function (req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const pairs = await getTopPairs();
    const [ethPrice] = await getBundle("1");

    const tokens = pairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
      for (const token of [pair.token0, pair.token1]) {
        const id = getAddress(token.id);
        if (accumulator[id]) continue;
        accumulator[id] = {
          name: token.name,
          symbol: token.symbol,
          last_price: new BigNumber(token.derivedETH).times(new BigNumber(ethPrice)).toNumber(),
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
