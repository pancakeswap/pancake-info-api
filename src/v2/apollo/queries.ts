import gql from 'graphql-tag'

export const TOP_PAIRS = gql`
  fragment TokenInfo on Token {
    id
    symbol
    name
  }
  fragment DetailedPairInfo on Pair {
    token0Price
    token1Price
    reserve0
    reserve1
    volumeToken0
    volumeToken1
  }
  query($limit: Int!, $excludeTokenIds: [String!]!, $detailed: Boolean = false) {
    pairs(
      first: $limit
      orderBy: reserveETH
      orderDirection: desc
      where: { token0_not_in: $excludeTokenIds, token1_not_in: $excludeTokenIds }
    ) {
      id
      token0 {
        ...TokenInfo
      }
      token1 {
        ...TokenInfo
      }

      ...DetailedPairInfo @include(if: $detailed)
    }
  }
`

export const PAIR_RESERVES_BY_TOKENS = gql`
  query($token0: String!, $token1: String!) {
    pairs(where: { token0: $token0, token1: $token1 }) {
      reserve0
      reserve1
    }
  }
`

export const SWAPS = gql`
  query($skip: Int!, $pairId: ID!, $timestamp: BigInt!) {
    transactions(
      skip: $skip
      where: { id: $pairId, timestamp_gte: $timestamp }
      orderBy: timestamp
      orderDirection: asc
    ) {
      timestamp
      swaps {
        amount0In
        amount0Out
        amount1In
        amount1Out
      }
    }
  }
`
