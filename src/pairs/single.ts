import { NowRequest, NowResponse } from '@now/node'

import { return200, return500, return400 } from '../_utils'
import { getExchangeAddress, get24HourPairData, get24HoursAgo } from './_shared'

export default async function(req: NowRequest, res: NowResponse): Promise<NowResponse> {
  if (
    !req.query.tokenAddress ||
    typeof req.query.tokenAddress !== 'string' ||
    !/^0x[0-9a-fA-F]{40}$/.test(req.query.tokenAddress)
  ) {
    return return400(res)
  }

  const tokenAddress = req.query.tokenAddress.toLowerCase()

  let exchangeAddress
  try {
    exchangeAddress = await getExchangeAddress(tokenAddress)
  } catch (error) {
    return return500(res, error)
  }

  return get24HourPairData(tokenAddress, exchangeAddress, get24HoursAgo())
    .then((returnData): NowResponse => return200(res, returnData))
    .catch((error): NowResponse => return500(res, error))
}
