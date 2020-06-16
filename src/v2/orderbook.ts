import { getAddress } from '@ethersproject/address'
import { NowRequest, NowResponse } from '@now/node'

import { getReserves } from './_shared'
import { return200, return400, return500 } from '../utils'

export default async function(req: NowRequest, res: NowResponse): Promise<void> {
  if (
    !req.query.pair ||
    typeof req.query.pair !== 'string' ||
    !/^0x[0-9a-fA-F{40}]_0x[0-9a-fA-F]{40}$/.test(req.query.pair)
  ) {
    return400(res)
    return
  }

  const [token0, token1] = req.query.pair.split('_')
  let id0: string, id1: string
  try {
    id0 = getAddress(token0)
    id1 = getAddress(token1)
  } catch (error) {
    return400(res)
    return
  }

  try {
    const reserves = await getReserves(id0, id1)
    return200(res, reserves, 60 * 10)
  } catch (error) {
    return500(res, error)
  }
}
