import { NowRequest, NowResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import BigNumber from "bignumber.js";
import { getTopPairs } from "../utils";
import { return200, return500 } from "../utils/response";

interface ReturnShape {
  [tokenIds: string]: {
    base_name: string;
    base_symbol: string;
    base_address: string;
    quote_name: string;
    quote_symbol: string;
    quote_address: string;
    last_price: number;
    base_volume: number;
    quote_volume: number;
    liquidity: number;
    liquidity_BNB: number;
  };
}

export default async function (req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const pairs = await getTopPairs();
    return200(
      res,
      pairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
        const id0 = getAddress(pair.token0.id);
        const id1 = getAddress(pair.token1.id);

        accumulator[`${id0}_${id1}`] = {
          base_name: pair.token0.name,
          base_symbol: pair.token0.symbol,
          base_address: id0,
          quote_name: pair.token1.name,
          quote_symbol: pair.token1.symbol,
          quote_address: id1,
          last_price: pair.price ?? 0,
          base_volume: pair.previous24hVolumeToken0,
          quote_volume: pair.previous24hVolumeToken1,
          liquidity: new BigNumber(pair.reserveUSD).toNumber(),
          liquidity_BNB: new BigNumber(pair.reserveETH).toNumber(),
        };

        return accumulator;
      }, {})
    );
  } catch (error) {
    return500(res, error);
  }
}
