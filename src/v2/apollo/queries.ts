import gql from 'graphql-tag'

export const TOP_PAIRS = gql`
  fragment TokenInfo on Token {
    id
    symbol
    name
  }
  fragment DetailedPairInfo on PairDayData {
    reserve0
    reserve1
    dailyVolumeToken0
    dailyVolumeToken1
  }
  query($limit: Int!, $excludeTokenIds: [String!]!, $detailed: Boolean = false) {
    pairDayDatas(
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

export const SWAPS_BY_TOKENS = gql`
  query($skip: Int!, $token0: String!, $token1: String!, $timestamp: BigInt!) {
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
