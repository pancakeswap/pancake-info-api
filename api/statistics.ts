import { NowRequest, NowResponse } from "@vercel/node";
import BigNumber from "bignumber.js";
import { getStatistics } from "../utils";
import { return200, return500 } from "../utils/response";

export default async function (req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const [totalLiquidityUSD, totalLiquidityETH, pairCount] = await getStatistics();

    return200(res, {
      total_liquidity: new BigNumber(totalLiquidityUSD).toNumber(),
      total_liquidity_BNB: new BigNumber(totalLiquidityETH).toNumber(),
      total_pair: new BigNumber(pairCount).toNumber(),
    });
  } catch (error) {
    return500(res, error);
  }
}
