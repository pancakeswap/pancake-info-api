import gql from 'graphql-tag'

export const TOP_PAIRS = gql`
  query($limit: Int!) {
    pairs(first: $limit, orderBy: reserveETH, orderDirection: desc) {
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

export const PAIR_DATA = gql`
  query($pairId: ID!) {
    pair(id: $pairId) {
      token0Price
      token1Price

      volumeToken0
      volumeToken1
    }
  }
`

export const ORDERBOOK = gql`
  query($exchangeAddress: String!) {
    exchanges(where: { id: $exchangeAddress }) {
      tokenDecimals
    }

    exchangeHistoricalDatas(
      first: 1
      where: { exchangeAddress: $exchangeAddress }
      orderBy: timestamp
      orderDirection: desc
    ) {
      timestamp
      ethBalance
      tokenBalance
    }
  }
`

export const TRANSACTIONS = gql`
  query($skip: Int!, $exchangeAddress: String!, $timestamp: Int!) {
    transactions(
      skip: $skip
      where: { exchangeAddress: $exchangeAddress, timestamp_gte: $timestamp }
      orderBy: timestamp
      orderDirection: asc
    ) {
      timestamp
      ethPurchaseEvents {
        id
        ethAmount
        tokenAmount
      }
      tokenPurchaseEvents {
        id
        ethAmount
        tokenAmount
      }
    }
  }
`
