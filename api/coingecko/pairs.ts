import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import BigNumber from "bignumber.js";
import { getTopPairs } from "../../utils";
import { return200, return500 } from "../../utils/response";

interface ReturnShape {
  [tokenIds: string]: {
    ticker_id: string;
    base: string;
    target: string;
    pool_id: string;
  };
}

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const pairs = await getTopPairs();
    return200(
      res,
      pairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
        const pId = getAddress(pair.id);
        const id0 = getAddress(pair.token0.id);
        const id1 = getAddress(pair.token1.id);

        accumulator[`${id0}_${id1}`] = {
          ticker_id: `${id0}_${id1}`,
          base: pair.token0.symbol,
          target: pair.token1.symbol,
          pool_id: pId,
        };

        return accumulator;
      }, {})
    );
  } catch (error: any) {
    return500(res, error);
  }
}
