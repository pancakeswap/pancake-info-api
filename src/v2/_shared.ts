import BigNumber from 'bignumber.js'
import gql from 'graphql-tag'
import BLACKLIST from '../constants/blacklist'

import client from './apollo/client'
import { PAIR_RESERVES_BY_TOKENS, PAIRS_VOLUME_QUERY_STRING, SWAPS_BY_PAIR, TOP_PAIRS, PAIR_FROM_TOKENS } from './apollo/queries'
import { getBlockFromTimestamp } from './blocks/queries'
import {
  PairReservesQuery,
  PairReservesQueryVariables,
  PairsVolumeQuery,
  PairsVolumeQueryVariables,
  SwapsByPairQuery,
  SwapsByPairQueryVariables,
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
export type Pair = TopPairsQuery['pairs'][number]

export interface MappedDetailedPair extends Pair {
  price?: string
  previous24hVolumeToken0: BigNumber
  previous24hVolumeToken1: BigNumber
}

export async function getTopPairs(): Promise<MappedDetailedPair[]> {
  const epochSecond = Math.floor(new Date().getTime() / 1000)
  const firstBlock = await getBlockFromTimestamp(epochSecond - 86400)

  if (!firstBlock) {
    throw new Error('first block was not fetched')
  }

  console.debug('Fetching pair info for historical block', firstBlock)

  const {
    data: { pairs },
    errors: topPairsErrors
  } = await client.query<TopPairsQuery, TopPairsQueryVariables>({
    query: TOP_PAIRS,
    variables: {
      limit: TOP_PAIR_LIMIT,
      excludeTokenIds: BLACKLIST
    },
    fetchPolicy: 'no-cache'
  })

  if (topPairsErrors && topPairsErrors.length > 0) {
    console.error('Failed to fetch top pairs', topPairsErrors)
    throw new Error('Failed to fetch top pairs from the subgraph')
  }

  // workaround for https://github.com/graphprotocol/graph-node/issues/1460
  const volumeQuery = gql`
    ${PAIRS_VOLUME_QUERY_STRING.replace(/__BLOCK_NUMBER__/g, `block: {number: ${firstBlock}}`)}
  `
  const {
    data: { pairVolumes },
    errors: yesterdayVolumeErrors
  } = await client.query<PairsVolumeQuery, PairsVolumeQueryVariables>({
    query: volumeQuery,
    variables: {
      limit: TOP_PAIR_LIMIT,
      pairIds: pairs.map(pair => pair.id)
    },
    fetchPolicy: 'no-cache'
  })

  if (yesterdayVolumeErrors && yesterdayVolumeErrors.length > 0) {
    console.error('Failed to fetch yesterday volume', yesterdayVolumeErrors)
    throw new Error(`Failed to get volume info for 24h ago from the subgraph`)
  }

  const yesterdayVolumeIndex =
    pairVolumes?.reduce<{ [pairId: string]: { volumeToken0: BigNumber; volumeToken1: BigNumber } }>((memo, pair) => {
      memo[pair.id] = { volumeToken0: new BigNumber(pair.volumeToken0), volumeToken1: new BigNumber(pair.volumeToken1) }
      return memo
    }, {}) ?? {}

  return (
    pairs?.map(
      (pair): MappedDetailedPair => {
        const yesterday = yesterdayVolumeIndex[pair.id]
        if (yesterday) {
          if (yesterday.volumeToken0.gt(pair.volumeToken0)) {
            throw new Error(`Invalid subgraph response: pair ${pair.id} returned volumeToken0 < yesterday.volumeToken0`)
          }
          if (yesterday.volumeToken1.gt(pair.volumeToken1)) {
            throw new Error(`Invalid subgraph response: pair ${pair.id} returned volumeToken1 < yesterday.volumeToken1`)
          }
        }

        return {
          ...pair,
          price:
            pair.reserve0 !== '0' && pair.reserve1 !== '0'
              ? new BigNumber(pair.reserve1).dividedBy(pair.reserve0).toString()
              : undefined,
          previous24hVolumeToken0:
            pair.volumeToken0 && yesterday?.volumeToken0
              ? new BigNumber(pair.volumeToken0).minus(yesterday.volumeToken0)
              : new BigNumber(pair.volumeToken0),
          previous24hVolumeToken1:
            pair.volumeToken1 && yesterday?.volumeToken1
              ? new BigNumber(pair.volumeToken1).minus(yesterday.volumeToken1)
              : new BigNumber(pair.volumeToken1)
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

type Swap = ArrayElement<SwapsByPairQuery['swaps']>

interface SwapMapped extends Swap {
  amountAIn: string
  amountAOut: string
  amountBIn: string
  amountBOut: string
}

export async function getSwaps(tokenA: string, tokenB: string): Promise<SwapMapped[]> {
  const _24HoursAgo = get24HoursAgo()
  const [token0, token1] = sortedFormatted(tokenA, tokenB)
  
  let {data : {
    pairs : [{id: pairAddress}]
  }} = await client.query({
    query: PAIR_FROM_TOKENS,
    variables: {
      token0,
      token1
    }
  })


  const sorted = isSorted(tokenA, tokenB)
  let skip = 0
  let results: SwapMapped[] = []
  let finished = false
  while (!finished) {
    await client
      .query<SwapsByPairQuery, SwapsByPairQueryVariables>({
        query: SWAPS_BY_PAIR,
        variables: {
          skip,
          pairAddress,
          timestamp: _24HoursAgo
        }
      })
      .then(
        ({
          data: {
            swaps
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
