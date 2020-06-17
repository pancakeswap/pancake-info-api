import BigNumber from 'bignumber.js'
import BLACKLIST from '../constants/blacklist'

import client from './apollo/client'
import { PAIR_RESERVES_BY_TOKENS, SWAPS_BY_TOKENS, TOP_PAIRS } from './apollo/queries'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
export function get24HoursAgo(): number {
  return Math.floor((Date.now() - DAY) / 1000)
}

const TOP_PAIR_LIMIT = 1000
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
  reserve0: string
  reserve1: string
  dailyVolumeToken0: string
  dailyVolumeToken1: string
}
export interface MappedDetailedPair extends DetailedPair {
  price?: string
}
export async function getTopPairs<T extends boolean>(
  detailed: T
): Promise<T extends true ? MappedDetailedPair[] : Pair[]> {
  const {
    data: { pairDayDatas: pairs }
  } = await client.query({
    query: TOP_PAIRS,
    variables: {
      limit: TOP_PAIR_LIMIT,
      excludeTokenIds: BLACKLIST,
      detailed,
      // yesterday's data
      date: Math.floor(new Date().getTime() / (86400 * 1000)) - 1
    }
  })
  return detailed
    ? pairs.map(
        (pair: DetailedPair): MappedDetailedPair => ({
          ...pair,
          price:
            pair.reserve0 !== '0' && pair.reserve1 !== '0'
              ? new BigNumber(pair.reserve1).dividedBy(pair.reserve0).toString()
              : undefined
        })
      )
    : pairs
}

function isSorted(tokenA: string, tokenB: string): boolean {
  return tokenA.toLowerCase() < tokenB.toLowerCase()
}

function sortedFormatted(tokenA: string, tokenB: string): [string, string] {
  return isSorted(tokenA, tokenB)
    ? [tokenA.toLowerCase(), tokenB.toLowerCase()]
    : [tokenB.toLowerCase(), tokenA.toLowerCase()]
}

// returns reserves of token a and b in the order they are queried
export async function getReserves(tokenA: string, tokenB: string): Promise<[string, string]> {
  const [token0, token1] = sortedFormatted(tokenA, tokenB)
  return client
    .query({
      query: PAIR_RESERVES_BY_TOKENS,
      variables: {
        token0,
        token1
      }
    })
    .then(({ data: { pairs: [{ reserve0, reserve1 }] } }): [string, string] =>
      tokenA.toLowerCase() === token0 ? [reserve0, reserve1] : [reserve1, reserve0]
    )
}

interface Swap {
  id: string
  timestamp: number
  amount0In: string
  amount0Out: string
  amount1In: string
  amount1Out: string
}
interface SwapMapped extends Swap {
  amountAIn: string
  amountAOut: string
  amountBIn: string
  amountBOut: string
}
export async function getSwaps(tokenA: string, tokenB: string): Promise<SwapMapped[]> {
  const _24HoursAgo = get24HoursAgo()
  const [token0, token1] = sortedFormatted(tokenA, tokenB)

  const sorted = isSorted(tokenA, tokenB)
  let skip = 0
  let results: SwapMapped[] = []
  let finished = false
  while (!finished) {
    await client
      .query<{ pairs: [{ swaps: Swap[] }] }>({
        query: SWAPS_BY_TOKENS,
        variables: {
          skip,
          token0,
          token1,
          timestamp: _24HoursAgo
        }
      })
      .then(
        ({
          data: {
            pairs: [{ swaps }]
          }
        }): void => {
          if (swaps.length === 0) {
            finished = true
          } else {
            skip += swaps.length

            results = results.concat(
              swaps.map(
                (swap): SwapMapped => ({
                  ...swap,
                  amountAIn: sorted ? swap.amount0In : swap.amount1In,
                  amountAOut: sorted ? swap.amount0Out : swap.amount1Out,
                  amountBIn: sorted ? swap.amount1In : swap.amount0In,
                  amountBOut: sorted ? swap.amount1Out : swap.amount0Out
                })
              )
            )
          }
        }
      )
  }

  return results
}
