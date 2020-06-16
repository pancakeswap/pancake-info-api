import { NowRequest, NowResponse } from '@now/node'

import { getTrades } from './_shared'
import { return200, return400, return500 } from '../utils'

export default async function(req: NowRequest, res: NowResponse): Promise<NowResponse> {
  if (!req.query.pair || typeof req.query.pair !== 'string' || !/^ETH_0x[0-9a-fA-F]{40}$/.test(req.query.pair)) {
    return return400(res)
  }

  return await getTrades(req.query.pair.substring(4))
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
          60 * 15 // cache for 15 minutes
        )
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
