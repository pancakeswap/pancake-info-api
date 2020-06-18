import BigNumber from 'bignumber.js'
import BLACKLIST from '../constants/blacklist'
import { getAddress } from '@ethersproject/address'
import { computeBidsAsks } from '../utils/computeBidsAsks'

import client from './apollo/client'
import { TOP_PAIRS, TOP_PAIRS_DATA, ORDERBOOK, TRANSACTIONS } from './apollo/queries'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
export function get24HoursAgo(): number {
  return Math.floor((Date.now() - DAY) / 1000)
}

const TOP_PAIR_LIMIT = 100
interface Pair {
  tokenAddress: string
  tokenSymbol?: string
  tokenName?: string
  exchangeAddress: string
}
export async function getTopPairs(): Promise<Pair[]> {
  return client
    .query({
      query: TOP_PAIRS,
      variables: {
        limit: TOP_PAIR_LIMIT
      }
    })
    .then(({ data: { exchanges } }): Pair[] =>
      exchanges
        .map(
          ({ tokenAddress, tokenSymbol, tokenName, id }: any): Pair => {
            const normalized = {
              tokenAddress: getAddress(tokenAddress),
              tokenSymbol,
              tokenName,
              exchangeAddress: getAddress(id)
            }
            // hard-code SAI
            if (normalized.tokenAddress === '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359') {
              normalized.tokenSymbol = 'Sai Stablecoin v1.0'
              normalized.tokenName = 'SAI'
            }
            return normalized
          }
        )
        .filter((pair: Pair): boolean => !BLACKLIST.includes(pair.tokenAddress.toLowerCase()))
    )
}

interface PairData {
  price: string
  tradeVolumeEth: string
  tradeVolumeToken: string
}
export async function getTopPairsData(): Promise<[Pair[], PairData[]]> {
  const topPairs = await getTopPairs()

  const _24HoursAgo = get24HoursAgo()
  const topPairsData = await Promise.all(
    topPairs.map(
      (pair): Promise<PairData> =>
        client
          .query({
            query: TOP_PAIRS_DATA,
            variables: {
              exchangeAddress: pair.exchangeAddress.toLowerCase(),
              timestamp: _24HoursAgo
            }
          })
          .then(
            ({ data: { exchanges, exchangeHistoricalDatas } }): PairData => {
              const price = exchanges[0].price

              const tradeVolumeEth = new BigNumber(exchanges[0].tradeVolumeEth)
              const tradeVolumeToken = new BigNumber(exchanges[0].tradeVolumeToken)

              const tradeVolumeEth24HoursAgo = new BigNumber(
                exchangeHistoricalDatas[0] ? exchangeHistoricalDatas[0].tradeVolumeEth : 0
              )
              const tradeVolumeToken24HoursAgo = new BigNumber(
                exchangeHistoricalDatas[0] ? exchangeHistoricalDatas[0].tradeVolumeToken : 0
              )

              return {
                price,
                tradeVolumeEth: tradeVolumeEth.minus(tradeVolumeEth24HoursAgo).toString(),
                tradeVolumeToken: tradeVolumeToken.minus(tradeVolumeToken24HoursAgo).toString()
              }
            }
          )
    )
  )

  return [topPairs, topPairsData]
}

interface Orderbook {
  timestamp: number
  bids: [string, string][]
  asks: [string, string][]
}
export async function getOrderbook(exchangeAddress: string): Promise<Orderbook> {
  const exchangeHistoricalData = await client
    .query({
      query: ORDERBOOK,
      variables: {
        exchangeAddress: exchangeAddress.toLowerCase()
      }
    })
    .then(
      ({
        data: {
          exchangeHistoricalDatas: [exchangeHistoricalData]
        }
      }): any => exchangeHistoricalData
    )

  return {
    timestamp: exchangeHistoricalData.timestamp,
    ...computeBidsAsks(
      new BigNumber(exchangeHistoricalData.ethBalance),
      new BigNumber(exchangeHistoricalData.tokenBalance),
      20
    )
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
        query: TRANSACTIONS,
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
