import { NowRequest, NowResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import BigNumber from "bignumber.js";
import { getTopPairs } from "../utils";
import { return200, return500 } from "../utils/response";

interface ReturnShape {
  [tokenIds: string]: {
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
          last_price: pair.price ?? 0,
          base_volume: new BigNumber(pair.volumeToken0).toNumber(),
          quote_volume: new BigNumber(pair.volumeToken1).toNumber(),
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
