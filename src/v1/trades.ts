import { NowRequest, NowResponse } from '@now/node'

import { getTrades } from './_shared'
import { return200, return400, return500 } from '../_utils'

export default async function(req: NowRequest, res: NowResponse): Promise<NowResponse> {
  if (
    !req.query.exchangeAddress ||
    typeof req.query.exchangeAddress !== 'string' ||
    !/^0x[0-9a-fA-F]{40}$/.test(req.query.exchangeAddress)
  ) {
    return return400(res)
  }

  return await getTrades(req.query.exchangeAddress)
    .then(
      (trades): NowResponse => {
        return return200(
          res,
          trades.map((trades): any => ({
            trade_id: trades.id,
            price: trades.price,
            base_volume: trades.ethAmount,
            quote_volume: trades.tokenAmount,
            trade_timestamp: trades.timestamp,
            type: trades.type
          })),
          60 * 60 // cache for 1 hour
        )
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
