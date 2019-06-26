import BigNumber from 'bignumber.js'
import { NowRequest, NowResponse } from '@now/node'

import client from './apollo/client'
import { TOKEN_HISTORICAL_DATA } from './apollo/queries'

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

async function getVolumeAsOf(tokenAddress: string, timestamp: number): Promise<BigNumber | null> {
  return client
    .query({
      query: TOKEN_HISTORICAL_DATA,
      variables: {
        tokenAddress,
        timestamp
      },
      fetchPolicy: 'no-cache'
    })
    .then(result => {
      const {
        data: { exchangeHistoricalDatas }
      } = result

      return new BigNumber(exchangeHistoricalDatas[0].tradeVolumeEth)
    })
    .catch(error => {
      console.error(error)
      return null
    })
}

export default async function TokenData(req: NowRequest, res: NowResponse) {
  // validate parameter arguments
  const { query } = req

  if (
    !query ||
    !query.tokenAddress ||
    typeof query.tokenAddress !== 'string' ||
    !/^0x[0-9a-fA-F]{40}$/.test(query.tokenAddress)
  ) {
    return res.status(400).send('Incorrectly formatted parameters.')
  }

  const { tokenAddress } = query

  // fetch data from the graph
  const now = Math.floor(Date.now() / 1000)
  const _24HoursAgo = now - DAY

  return await Promise.all([getVolumeAsOf(tokenAddress, now), getVolumeAsOf(tokenAddress, _24HoursAgo)]).then(
    ([ethVolumeNow, ethVolumeHistorical]) => {
      if (ethVolumeNow === null || ethVolumeHistorical === null) {
        return res.status(500).send('Unknown error.')
      } else {
        const volume = ethVolumeNow.minus(ethVolumeHistorical)
        return res.status(200).json({
          volume_24h: {
            ETH: volume.toFixed(18)
          }
        })
      }
    }
  )
}
