import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import BigNumber from "bignumber.js";
import { getTopPairs } from "../utils";
import { return200, return500 } from "../utils/response";

interface ReturnShape {
  [tokenAddress: string]: {
    name: string;
    symbol: string;
    price: number;
    price_BNB: number;
  };
}

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const pairs = await getTopPairs();

    const tokens = pairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
      for (const token of [pair.token0, pair.token1]) {
        const id = getAddress(token.id);
        if (accumulator[id]) continue;
        accumulator[id] = {
          name: token.name,
          symbol: token.symbol,
          price: new BigNumber(token.derivedUSD).toNumber(),
          price_BNB: new BigNumber(token.derivedBNB).toNumber(),
        };
      }

      return accumulator;
    }, {});
    return200(res, { updated_at: new Date().getTime(), data: tokens });
  } catch (error) {
    return500(res, error);
  }
}
