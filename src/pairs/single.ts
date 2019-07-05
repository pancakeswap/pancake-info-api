import { NowRequest, NowResponse } from '@now/node'

import { return200, return500, return400 } from '../_shared'
import { get24HourPairData, get24HoursAgo } from './_shared'

export default async function(req: NowRequest, res: NowResponse): Promise<NowResponse> {
  const { query } = req

  if (
    !query.tokenAddress ||
    typeof query.tokenAddress !== 'string' ||
    !/^0x[0-9a-fA-F]{40}$/.test(query.tokenAddress)
  ) {
    return return400(res)
  }

  return await get24HourPairData(query.tokenAddress, get24HoursAgo())
    .then((returnData): NowResponse => return200(res, returnData))
    .catch((error): NowResponse => return500(res, error))
}
