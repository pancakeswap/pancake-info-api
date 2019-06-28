import BigNumber from 'bignumber.js'
import { NowRequest, NowResponse } from '@now/node'

import client from '../_apollo/client'
import { TOKEN_HISTORICAL_DATA } from '../_apollo/queries'
import ReturnData from './types'
import { return200, return500, return400 } from '../_shared'

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

interface HistoricalDataSuccess {
  tradeVolumeEth: BigNumber
  price: BigNumber
}

interface HistoricalDataError {
  error: Error
}

type HistoricalDataResponse = HistoricalDataSuccess | HistoricalDataError

function isHistoricalDataError(response: HistoricalDataResponse): response is HistoricalDataError {
  return !!(response as HistoricalDataError).error
}

async function getHistoricalDataAsOf(tokenAddress: string, timestamp: number): Promise<HistoricalDataResponse> {
  return client
    .query({
      query: TOKEN_HISTORICAL_DATA,
      variables: {
        tokenAddress,
        timestamp
      },
      fetchPolicy: 'no-cache'
    })
    .then(
      (result): HistoricalDataSuccess => {
        const {
          data: { exchangeHistoricalDatas }
        } = result

        return {
          tradeVolumeEth: new BigNumber(exchangeHistoricalDatas[0].tradeVolumeEth),
          price: new BigNumber(exchangeHistoricalDatas[0].price)
        }
      }
    )
    .catch(
      (error): HistoricalDataError => {
        return { error }
      }
    )
}

export default async function TokenData(req: NowRequest, res: NowResponse): Promise<NowResponse> {
  // validate parameter arguments
  const { query } = req

  if (
    !query.tokenAddress ||
    typeof query.tokenAddress !== 'string' ||
    !/^0x[0-9a-fA-F]{40}$/.test(query.tokenAddress)
  ) {
    return return400(res)
  }

  const { tokenAddress } = query

  // fetch data from the graph
  const now = Math.floor(Date.now() / 1000)
  const _24HoursAgo = now - DAY

  return await Promise.all([
    getHistoricalDataAsOf(tokenAddress, now),
    getHistoricalDataAsOf(tokenAddress, _24HoursAgo)
  ]).then(
    ([dataNow, dataHistorical]): NowResponse => {
      if (isHistoricalDataError(dataNow)) {
        return return500(res, dataNow.error)
      }

      if (isHistoricalDataError(dataHistorical)) {
        return return500(res, dataHistorical.error)
      }

      const volume = dataNow.tradeVolumeEth.minus(dataHistorical.tradeVolumeEth)
      const price = dataNow.price

      const returnData: ReturnData = {
        volume_24h: {
          ETH: volume.toFixed(18)
        },
        price_last: price.toFixed(18)
      }

      return return200(res, returnData)
    }
  )
}
