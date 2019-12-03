import gql from 'graphql-tag'

export const TOP_PAIRS = gql`
  query _($limit: Int!) {
    exchanges(first: $limit, orderBy: ethLiquidity, orderDirection: desc) {
      tokenAddress
      tokenSymbol
      tokenName
      id
    }
  }
`

export const TOP_PAIRS_DATA = gql`
  query _($exchangeAddress: String!, $timestamp: Int!) {
    exchanges(where: { id: $exchangeAddress }) {
      price
      tradeVolumeEth
      tradeVolumeToken
    }

    exchangeHistoricalDatas(
      where: { exchangeAddress: $exchangeAddress, timestamp_lte: $timestamp }
      first: 1
      orderBy: timestamp
      orderDirection: desc
    ) {
      tradeVolumeEth
      tradeVolumeToken
    }
  }
`

export const ORDERBOOK = gql`
  query _($exchangeAddress: String!) {
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
  query _($skip: Int!, $exchangeAddress: String!, $timestamp: Int!) {
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
