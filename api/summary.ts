import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../utils";
import { return200, return500 } from "../utils/response";

interface ReturnShape {
  [tokenIds: string]: {
    price: string;
    base_volume: string;
    quote_volume: string;
    liquidity: string;
    liquidity_BNB: string;
  };
}

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const topPairs = await getTopPairs();

    const pairs = topPairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
      const t0Id = getAddress(pair.token0.id);
      const t1Id = getAddress(pair.token1.id);

      accumulator[`${t0Id}_${t1Id}`] = {
        price: pair.price,
        base_volume: pair.volumeToken0,
        quote_volume: pair.volumeToken1,
        liquidity: pair.reserveUSD,
        liquidity_BNB: pair.reserveBNB,
      };

      return accumulator;
    }, {});

    return200(res, { updated_at: new Date().getTime(), data: pairs });
  } catch (error) {
    return500(res, error);
  }
}
