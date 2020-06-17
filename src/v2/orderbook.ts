import { getAddress } from '@ethersproject/address'
import { NowRequest, NowResponse } from '@now/node'
import { BigNumber } from '@uniswap/sdk/dist'

import { getReserves } from './_shared'
import { return200, return400, return500 } from '../utils'

export default async function(req: NowRequest, res: NowResponse): Promise<void> {
  if (
    !req.query.pair ||
    typeof req.query.pair !== 'string' ||
    !/^0x[0-9a-fA-F]{40}_0x[0-9a-fA-F]{40}$/.test(req.query.pair)
  ) {
    return400(res, 'Invalid pair identifier: must be of format tokenAddress_tokenAddress')
    return
  }

  const [tokenA, tokenB] = req.query.pair.split('_')
  let idA: string, idB: string
  try {
    ;[idA, idB] = [getAddress(tokenA), getAddress(tokenB)]
  } catch (error) {
    return400(res)
    return
  }

  try {
    const [reservesA, reservesB] = await getReserves(idA, idB)

    const segments = Array.from({ length: 20 }, (x, i): number => i)

    const timestamp = new Date().getTime()

    const reservesABn = new BigNumber(reservesA)
    const reservesBBn = new BigNumber(reservesB)

    return200(
      res,
      {
        timestamp,
        bids: segments.map(i => {}),
        asks: segments.map(i => {})
      },
      60 * 15
    )
  } catch (error) {
    return500(res, error)
  }
}
