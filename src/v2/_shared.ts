import { BigNumber, getMarketDetails, getTradeDetails, TRADE_EXACT } from '@uniswap/sdk'
import BLACKLIST from '../constants/blacklist'

import client from './apollo/client'
import { PAIR_RESERVES, SWAPS, TOP_PAIRS } from './apollo/queries'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
export function get24HoursAgo(): number {
  return Math.floor((Date.now() - DAY) / 1000)
}

const TOP_PAIR_LIMIT = 100
interface Token {
  name: string
  symbol: string
  id: string
}
export interface Pair {
  id: string
  token0: Token
  token1: Token
}
export interface DetailedPair extends Pair {
  token0Price: number
  token1Price: number
  reserve0: string
  reserve1: string
  volumeToken0: string
  volumeToken1: string
}
export async function getTopPairs<T extends boolean>(detailed: T): Promise<T extends true ? DetailedPair[] : Pair[]> {
  const {
    data: { pairs }
  } = await client.query({
    query: TOP_PAIRS,
    variables: {
      limit: TOP_PAIR_LIMIT,
      excludeTokenIds: BLACKLIST,
      detailed
    }
  })
  return pairs
}

const DECIMALS_FACTOR = (decimals: number = 18): BigNumber => new BigNumber(10).pow(decimals)
interface Orderbook {
  timestamp: number
  bids: [string, string][]
  asks: [string, string][]
}
export async function getOrderbook(pairId: string): Promise<Orderbook> {
  const [exchange, exchangeHistoricalData] = await client
    .query({
      query: PAIR_RESERVES,
      variables: {
        exchangeAddress: pairId.toLowerCase()
      }
    })
    .then(({ data: { exchanges, exchangeHistoricalDatas } }): any => [exchanges[0], exchangeHistoricalDatas[0]])

  const reserves = {
    token: { decimals: exchange.tokenDecimals },
    ethReserve: {
      token: { decimals: 18 },
      amount: new BigNumber(exchangeHistoricalData.ethBalance).multipliedBy(DECIMALS_FACTOR())
    },
    tokenReserve: {
      token: { decimals: exchange.tokenDecimals },
      amount: new BigNumber(exchangeHistoricalData.tokenBalance).multipliedBy(DECIMALS_FACTOR(exchange.tokenDecimals))
    }
  }
  const marketDetailsEthToToken = getMarketDetails(undefined, reserves)
  const marketDetailsTokenToEth = getMarketDetails(reserves, undefined)

  const segments = Array(19)
    .fill(undefined)
    .map((_, i): number => i + 1)

  const amount = new BigNumber(exchangeHistoricalData.ethBalance).multipliedBy(DECIMALS_FACTOR()).dividedToIntegerBy(20)

  const bids: [string, string][] = segments.map((i): [string, string] => {
    const tradeDetails = getTradeDetails(TRADE_EXACT.INPUT, amount.multipliedBy(i), marketDetailsEthToToken)
    return [amount.dividedBy(DECIMALS_FACTOR()).toString(), tradeDetails.executionRate.rate.toString()]
  })
  const asks: [string, string][] = segments.map((i): [string, string] => {
    const tradeDetails = getTradeDetails(TRADE_EXACT.OUTPUT, amount.multipliedBy(i), marketDetailsTokenToEth)
    return [amount.dividedBy(DECIMALS_FACTOR()).toString(), tradeDetails.executionRate.rateInverted.toString()]
  })

  return {
    timestamp: exchangeHistoricalData.timestamp,
    bids,
    asks
  }
}

interface Trade {
  id: string
  timestamp: number
  type: 'buy' | 'sell'
  ethAmount: string
  tokenAmount: string
  price: string
}
export async function getTrades(exchangeAddress: string): Promise<Trade[]> {
  const _24HoursAgo = get24HoursAgo()

  let skip = 0
  let results: Trade[] = []
  let finished = false
  while (!finished) {
    await client
      .query({
        query: SWAPS,
        variables: {
          skip,
          exchangeAddress: exchangeAddress.toLowerCase(),
          timestamp: _24HoursAgo
        }
      })
      .then(({ data: { transactions } }): void => {
        if (transactions.length === 0) {
          finished = true
        } else {
          skip += transactions.length

          results = results.concat(
            transactions
              .map((transaction: any): Trade[] => [
                ...transaction.ethPurchaseEvents.map(
                  (event: any): Trade => ({
                    id: event.id,
                    timestamp: transaction.timestamp,
                    type: 'buy',
                    ethAmount: event.ethAmount,
                    tokenAmount: event.tokenAmount,
                    price: new BigNumber(event.tokenAmount).dividedBy(new BigNumber(event.ethAmount)).toString()
                  })
                ),
                ...transaction.tokenPurchaseEvents.map(
                  (event: any): Trade => ({
                    id: event.id,
                    timestamp: transaction.timestamp,
                    type: 'sell',
                    ethAmount: event.ethAmount,
                    tokenAmount: event.tokenAmount,
                    price: new BigNumber(event.tokenAmount).dividedBy(new BigNumber(event.ethAmount)).toString()
                  })
                )
              ])
              .reduce((accumulator: any, trades: Trade[]): Trade[] => accumulator.concat(trades))
          )
        }
      })
  }

  return results
}
