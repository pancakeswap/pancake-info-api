import gql from 'graphql-tag'

export const TOP_PAIRS = gql`
  query($limit: Int!, $excludeTokenIds: [String!]!) {
    pairs(
      first: $limit
      orderBy: reserveETH
      orderDirection: desc
      where: { token0_not_in: $excludeTokenIds, token1_not_in: $excludeTokenIds }
    ) {
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
    }
  }
`

export const PAIR_PRICE_VOLUME = gql`
  query($pairId: ID!) {
    pair(id: $pairId) {
      token0Price
      token1Price

      volumeToken0
      volumeToken1
    }
  }
`

export const PAIR_RESERVES = gql`
  query($pairId: ID!) {
    pair(id: $pairId) {
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
