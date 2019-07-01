import BigNumber from 'bignumber.js'
import { NowRequest, NowResponse } from '@now/node'
import { getAddress } from '@ethersproject/address'

import client from '../_apollo/client'
import { PAIR_HISTORICAL_DATA } from '../_apollo/queries'
import ReturnData from './types'
import { return200, return500, return400 } from '../_shared'

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

interface ExchangeData {
  tradeVolumeEth: BigNumber
  tradeVolumeToken: BigNumber
  price: BigNumber
}

export default async function(req: NowRequest, res: NowResponse): Promise<NowResponse> {
  // validate parameter arguments
  const { query } = req

  if (
    !query.tokenAddress ||
    typeof query.tokenAddress !== 'string' ||
    !/^0x[0-9a-fA-F]{40}$/.test(query.tokenAddress)
  ) {
    return return400(res)
  }

  const tokenAddress = getAddress(query.tokenAddress)

  // fetch data from the graph
  const now = Math.floor(Date.now() / 1000)
  const _24HoursAgo = now - DAY

  return await client
    .query({
      query: PAIR_HISTORICAL_DATA,
      variables: {
        tokenAddress,
        timestamp: _24HoursAgo
      },
      fetchPolicy: 'no-cache'
    })
    .then(
      (result): NowResponse => {
        const {
          data: { exchanges, exchangeHistoricalDatas }
        } = result

        const exchange = exchanges[0]
        const exchangeHistoricalData = exchangeHistoricalDatas[0]

        const now: ExchangeData = {
          tradeVolumeEth: new BigNumber(exchange.tradeVolumeEth),
          tradeVolumeToken: new BigNumber(exchange.tradeVolumeToken),
          price: new BigNumber(exchange.price)
        }

        const then: ExchangeData = {
          tradeVolumeEth: new BigNumber(exchangeHistoricalData.tradeVolumeEth),
          tradeVolumeToken: new BigNumber(exchangeHistoricalData.tradeVolumeToken),
          price: new BigNumber(exchangeHistoricalData.price)
        }

        const volumeEth = now.tradeVolumeEth.minus(then.tradeVolumeEth)
        const volumeToken = now.tradeVolumeToken.minus(then.tradeVolumeToken)
        const price = now.price

        const returnData: ReturnData = {
          volume_24h: {
            ETH: volumeEth.toFixed(18),
            [tokenAddress]: volumeToken.toFixed(18)
          },
          price_last: price.toFixed(18)
        }

        return return200(res, returnData)
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
