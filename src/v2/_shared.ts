import BigNumber from 'bignumber.js'
import gql from 'graphql-tag'
import BLACKLIST from '../constants/blacklist'

import client from './apollo/client'
import { PAIR_RESERVES_BY_TOKENS, SWAPS_BY_TOKENS, TOP_PAIR_QUERY, TOP_PAIRS } from './apollo/queries'
import { getBlockFromTimestamp } from './blocks/queries'
import {
  PairReservesQuery,
  PairReservesQueryVariables,
  SwapsByTokensQuery,
  SwapsByTokensQueryVariables,
  TopPairsQuery,
  TopPairsQueryVariables
} from './generated/v2-subgraph'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
export function get24HoursAgo(): number {
  return Math.floor((Date.now() - DAY) / 1000)
}

const TOP_PAIR_LIMIT = 1000
export type Pair = TopPairsQuery['lastPairs'][number]
export interface MappedDetailedPair extends Pair {
  price?: string
  previous24hVolumeToken0?: BigNumber
  previous24hVolumeToken1?: BigNumber
}

export async function getTopPairs(): Promise<MappedDetailedPair[]> {
  const epochSecond = Math.floor(new Date().getTime() / 1000)
  const firstBlock = await getBlockFromTimestamp(epochSecond - 86400)

  // workaround for https://github.com/graphprotocol/graph-node/issues/1460
  const actualQuery = gql`
    ${TOP_PAIR_QUERY.replace(/__BLOCK_NUMBER__/g, `block: { number: ${firstBlock} }`)}
  `

  const {
    data: { firstPairs, lastPairs }
  } = await client.query<TopPairsQuery, TopPairsQueryVariables>({
    query: actualQuery,
    variables: {
      limit: TOP_PAIR_LIMIT,
      excludeTokenIds: BLACKLIST
    }
  })

  const yesterdayVolumeIndex =
    firstPairs?.reduce<{ [pairId: string]: { volumeToken0: BigNumber; volumeToken1: BigNumber } }>((memo, pair) => {
      memo[pair.id] = { volumeToken0: new BigNumber(pair.volumeToken0), volumeToken1: new BigNumber(pair.volumeToken1) }
      return memo
    }, {}) ?? {}

  return (
    lastPairs?.map(
      (pair): MappedDetailedPair => {
        return {
          ...pair,
          price:
            pair.reserve0 !== '0' && pair.reserve1 !== '0'
              ? new BigNumber(pair.reserve1).dividedBy(pair.reserve0).toString()
              : undefined,
          previous24hVolumeToken0:
            pair.volumeToken0 && yesterdayVolumeIndex[pair.id]?.volumeToken0
              ? new BigNumber(pair.volumeToken0).minus(yesterdayVolumeIndex[pair.id].volumeToken0)
              : undefined,
          previous24hVolumeToken1:
            pair.volumeToken1 && yesterdayVolumeIndex[pair.id]?.volumeToken1
              ? new BigNumber(pair.volumeToken1).minus(yesterdayVolumeIndex[pair.id].volumeToken1)
              : undefined
        }
      }
    ) ?? []
  )
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
    .query<PairReservesQuery, PairReservesQueryVariables>({
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

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

type Swap = ArrayElement<SwapsByTokensQuery['pairs'][0]['swaps']>
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
      .query<SwapsByTokensQuery, SwapsByTokensQueryVariables>({
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
          if (!swaps || swaps.length === 0) {
            finished = true
          } else {
            skip += swaps.length

            results = results.concat(
              swaps.map(
                (swap: Swap): SwapMapped => ({
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
