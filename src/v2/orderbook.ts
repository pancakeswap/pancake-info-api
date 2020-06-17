import { getAddress } from '@ethersproject/address'
import { NowRequest, NowResponse } from '@now/node'
import { BigNumber } from '@uniswap/sdk'

import { getReserves } from './_shared'
import { return200, return400, return500 } from '../utils'

function computeBidsAsks(
  reservesA: BigNumber,
  reservesB: BigNumber,
  numSegments: number = 20
): { bids: [string, string][]; asks: [string, string][] } {
  if (reservesA.eq(0) || reservesB.eq(0)) {
    return {
      bids: [],
      asks: []
    }
  }

  const segments = Array.from({ length: numSegments }, (x, i): number => i)

  return {
    bids: [],
    asks: []
  }
}

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

    const timestamp = new Date().getTime()

    return200(
      res,
      {
        timestamp,
        ...computeBidsAsks(new BigNumber(reservesA), new BigNumber(reservesB))
      },
      60 * 15
    )
  } catch (error) {
    return500(res, error)
  }
}
