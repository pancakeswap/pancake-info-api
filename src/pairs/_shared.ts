import BigNumber from 'bignumber.js'
import { getAddress } from '@ethersproject/address'

import client from '../_apollo/client'
import { EXCHANGE_ADDRESS, ALL_PAIRS, PAIR_HISTORICAL_DATA } from '../_apollo/queries'
import { PairData } from './_types'

interface ExchangeData {
  tradeVolumeEth: BigNumber
  tradeVolumeToken: BigNumber
}

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
export function get24HoursAgo(): number {
  const now = Math.floor(Date.now() / 1000)
  return now - DAY
}

export async function getExchangeAddress(tokenAddress: string): Promise<string> {
  return client
    .query({
      query: EXCHANGE_ADDRESS,
      variables: {
        tokenAddress
      }
    })
    .then((result): any => {
      const {
        data: { exchanges }
      } = result

      return exchanges[0].id
    })
}

export async function getAllPairs(): Promise<any[]> {
  return client.query({ query: ALL_PAIRS }).then((result): any => {
    const {
      data: { exchanges }
    } = result
    return exchanges.map(({ tokenAddress, id }: any): any => ({ tokenAddress, exchangeAddress: id }))
  })
}

export async function get24HourPairData(
  tokenAddress: string,
  exchangeAddress: string,
  _24HoursAgo: number
): Promise<PairData> {
  return client
    .query({
      query: PAIR_HISTORICAL_DATA,
      variables: {
        tokenAddress,
        exchangeAddress,
        timestamp: _24HoursAgo
      }
    })
    .then(
      (result): PairData => {
        const {
          data: { exchanges, exchangeHistoricalDatas }
        } = result

        const exchange = exchanges[0]
        const exchangeHistoricalData = exchangeHistoricalDatas[0]

        const { tokenName, tokenSymbol, ethBalance, price } = exchange

        const volumeNow: ExchangeData = {
          tradeVolumeEth: new BigNumber(exchange.tradeVolumeEth),
          tradeVolumeToken: new BigNumber(exchange.tradeVolumeToken)
        }

        const volumeThen: ExchangeData = {
          tradeVolumeEth: new BigNumber(exchangeHistoricalData ? exchangeHistoricalData.tradeVolumeEth : 0),
          tradeVolumeToken: new BigNumber(exchangeHistoricalData ? exchangeHistoricalData.tradeVolumeToken : 0)
        }

        const volumeDeltaEth = volumeNow.tradeVolumeEth.minus(volumeThen.tradeVolumeEth)
        const volumeDeltaToken = volumeNow.tradeVolumeToken.minus(volumeThen.tradeVolumeToken)

        return {
          token_address: getAddress(tokenAddress),
          ...(tokenName && tokenName !== 'unknown' ? { token_name: tokenName } : {}),
          ...(tokenSymbol && tokenSymbol !== 'unknown' ? { token_symbol: tokenSymbol } : {}),
          liquidity_last: new BigNumber(ethBalance).toFixed(18),
          price_last: new BigNumber(price).toFixed(18),
          volume_24h: {
            ETH: volumeDeltaEth.toFixed(18),
            [tokenAddress]: volumeDeltaToken.toFixed(18)
          }
        }
      }
    )
}
