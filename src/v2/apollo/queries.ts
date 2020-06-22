import gql from 'graphql-tag'

export const TOP_PAIR_QUERY = `
  fragment TokenInfo on Token {
    id
    symbol
    name
  }

  query TopPairs($limit: Int!, $excludeTokenIds: [String!]!) {
    lastPairs: pairs(
      first: $limit
      orderBy: reserveUSD
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
      reserve0
      reserve1
      volumeToken0
      volumeToken1
    }

    firstPairs: pairs(
      first: $limit
      orderBy: reserveUSD
      orderDirection: desc
      where: { token0_not_in: $excludeTokenIds, token1_not_in: $excludeTokenIds }
      __BLOCK_NUMBER__
    ) {
      id
      volumeToken0
      volumeToken1
    }
  }
`

// only used for code gen because
// https://github.com/graphprotocol/graph-node/issues/1460
export const TOP_PAIRS = gql`
  fragment TokenInfo on Token {
    id
    symbol
    name
  }

  query TopPairs($limit: Int!, $excludeTokenIds: [String!]!) {
    lastPairs: pairs(
      first: $limit
      orderBy: reserveUSD
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
      reserve0
      reserve1
      volumeToken0
      volumeToken1
    }

    firstPairs: pairs(
      first: $limit
      orderBy: reserveUSD
      orderDirection: desc
      where: { token0_not_in: $excludeTokenIds, token1_not_in: $excludeTokenIds }
    ) {
      id
      volumeToken0
      volumeToken1
    }
  }
`

export const PAIR_RESERVES_BY_TOKENS = gql`
  query PairReserves($token0: String!, $token1: String!) {
    pairs(where: { token0: $token0, token1: $token1 }) {
      reserve0
      reserve1
    }
  }
`

export const SWAPS_BY_TOKENS = gql`
  query SwapsByTokens($skip: Int!, $token0: String!, $token1: String!, $timestamp: BigInt!) {
    pairs(where: { token0: $token0, token1: $token1 }) {
      swaps(skip: $skip, where: { timestamp_gte: $timestamp }, orderBy: timestamp, orderDirection: asc) {
        id
        timestamp
        amount0In
        amount0Out
        amount1In
        amount1Out
      }
    }
  }
`
