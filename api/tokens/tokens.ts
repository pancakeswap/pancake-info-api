import { VercelRequest, VercelResponse } from "@vercel/node";
import { getTokenByAddress } from "../../utils";
import { return200, return400, return500 } from "../../utils/response";
import { getAddress } from "@ethersproject/address";

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  if (
    !req.query.address ||
    typeof req.query.address !== "string" ||
    !req.query.address.match(/^0x[0-9a-fA-F]{40}$/)
  ) {
    return400(res, "Invalid address");
    return;
  }

  try {
    const address = getAddress(req.query.address);
    const token = await getTokenByAddress(address.toLowerCase());

    return200(res, {
      updated_at: new Date().getTime(),
      data: {
        name: token?.name,
        symbol: token?.symbol,
        price: token?.derivedUSD,
        price_BNB: token?.derivedBNB,
      },
    });
  } catch (error) {
    return500(res, error);
  }
}
