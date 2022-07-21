import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import BigNumber from "bignumber.js";
import { getReserves } from "../../utils";
import { computeBidsAsks } from "../../utils/computeBidsAsks";
import { return200, return400, return500 } from "../../utils/response";

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
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
    const [reservesA, reservesB] = await getReserves(idA, idB);

    const timestamp = new Date().getTime();

    return200(res, {
      ticker_id: req.query.pair,
      timestamp,
      ...computeBidsAsks(new BigNumber(reservesA), new BigNumber(reservesB)),
    });
  } catch (error: any) {
    return500(res, error);
  }
}
