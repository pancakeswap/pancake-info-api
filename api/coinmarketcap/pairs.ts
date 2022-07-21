import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../../utils";
import { return200, return500 } from "../../utils/response";

interface ReturnShape {
  [tokenIds: string]: {
    base_id: string;
    base_name: string;
    base_symbol: string;
    quote_id: string;
    quote_name: string;
    quote_symbol: string;
    last_price: string;
    base_volume: string;
    quote_volume: string;
  };
}

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const topPairs = await getTopPairs();

    const pairs = topPairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
      const t0Id = getAddress(pair.token0.id);
      const t1Id = getAddress(pair.token1.id);

      accumulator[`${t0Id}_${t1Id}`] = {
        base_id: t0Id,
        base_name: pair.token0.name,
        base_symbol: pair.token0.symbol,
        quote_id: t1Id,
        quote_name: pair.token1.name,
        quote_symbol: pair.token1.symbol,
        last_price: pair.price,
        base_volume: pair.previous24hVolumeToken0,
        quote_volume: pair.previous24hVolumeToken1,
      };

      return accumulator;
    }, {});

    return200(res, pairs);
  } catch (error: any) {
    return500(res, error);
  }
}
