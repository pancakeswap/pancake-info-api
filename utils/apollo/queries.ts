import gql from "graphql-tag";

export const BUNDLE_BY_ID = gql`
  query Bundle($id: ID!) {
    bundle(id: $id) {
      ethPrice
    }
  }
`;

export const PAIRS_VOLUME_QUERY = gql`
  query PairsVolume($limit: Int!, $pairIds: [ID!]!, $blockNumber: Int!) {
    pairVolumes: pairs(first: $limit, where: { id_in: $pairIds }, block: { number: $blockNumber }) {
      id
      volumeToken0
      volumeToken1
    }
  }
`;

// gets the top 1k pairs by USD reserves
export const TOP_PAIRS = gql`
  fragment TokenInfo on Token {
    id
    symbol
    name
    derivedETH
  }

  query TopPairs($limit: Int!, $excludeTokenIds: [String!]!) {
    pairs(
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
      reserveETH
      reserveUSD
    }
  }
`;

export const PAIR_RESERVES_BY_TOKENS = gql`
  query PairReserves($token0: String!, $token1: String!) {
    pairs(where: { token0: $token0, token1: $token1 }) {
      reserve0
      reserve1
    }
  }
`;

export const SWAPS_BY_PAIR = gql`
  query SwapsByPair($skip: Int!, $timestamp: BigInt!, $pairAddress: String!) {
    swaps(
      skip: $skip
      where: { timestamp_gte: $timestamp, pair: $pairAddress }
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      timestamp
      amount0In
      amount0Out
      amount1In
      amount1Out
    }
  }
`;

export const PAIR_FROM_TOKENS = gql`
  query SwapsByTokens($token0: String!, $token1: String!) {
    pairs(where: { token0: $token0, token1: $token1 }) {
      id
    }
  }
`;
