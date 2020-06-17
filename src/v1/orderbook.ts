import { NowRequest, NowResponse } from '@now/node'

import { getOrderbook } from './_shared'
import { return200, return400, return500 } from '../utils/response'

export default async function(req: NowRequest, res: NowResponse): Promise<NowResponse> {
  if (!req.query.pair || typeof req.query.pair !== 'string' || !/^ETH_0x[0-9a-fA-F]{40}$/.test(req.query.pair)) {
    return return400(res)
  }

  return await getOrderbook(req.query.pair.substring(4))
    .then(
      (orderbook): NowResponse => {
        return return200(
          res,
          {
            timestamp: orderbook.timestamp,
            bids: orderbook.bids,
            asks: orderbook.asks
          },
          60 * 15 // cache for 15 minutes
        )
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
