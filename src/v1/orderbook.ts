import { NowRequest, NowResponse } from '@now/node'

import { getOrderbook } from './_shared'
import { return200, return400, return500 } from '../_utils'

export default async function(req: NowRequest, res: NowResponse): Promise<NowResponse> {
  if (
    !req.query.exchangeAddress ||
    typeof req.query.exchangeAddress !== 'string' ||
    !/^0x[0-9a-fA-F]{40}$/.test(req.query.exchangeAddress)
  ) {
    return return400(res)
  }

  return await getOrderbook(req.query.exchangeAddress)
    .then(
      (orderbook): NowResponse => {
        return return200(
          res,
          {
            timestamp: orderbook.timestamp,
            bids: orderbook.bids,
            asks: orderbook.asks
          },
          60 * 60 // cache for 1 hour
        )
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
