import gql from 'graphql-tag'

export const EXCHANGE_ADDRESS = gql`
  query _($tokenAddress: String!) {
    exchanges(where: { tokenAddress: $tokenAddress }) {
      id
    }
  }
`

export const ALL_PAIRS = gql`
  query _ {
    exchanges(where: { ethBalance_gte: "1" }, orderBy: ethBalance, orderDirection: desc) {
      id
      tokenAddress
    }
  }
`

export const PAIR_HISTORICAL_DATA = gql`
  query _($tokenAddress: String!, $exchangeAddress: String!, $timestamp: Int!) {
    exchanges(where: { tokenAddress: $tokenAddress }) {
      tokenName
      tokenSymbol
      ethBalance
      price
      tradeVolumeEth
      tradeVolumeToken
    }

    exchangeHistoricalDatas(
      where: { exchangeAddress: $exchangeAddress, timestamp_lt: $timestamp }
      first: 1
      orderBy: timestamp
      orderDirection: desc
    ) {
      tradeVolumeEth
      tradeVolumeToken
    }
  }
`
