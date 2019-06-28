import gql from 'graphql-tag'

export const STATUS = gql`
  query uniswaps {
    uniswaps(where: { id: "1" }) {
      id
    }
  }
`

export const ALL_TOKENS = gql`
  query exchanges {
    uniswaps(where: { id: "1" }) {
      exchanges {
        tokenAddress
        tokenSymbol
        tokenName
      }
    }
  }
`

export const TOKEN_HISTORICAL_DATA = gql`
  query exchangeHistoricalDatas($tokenAddress: String!, $timestamp: Int!) {
    exchangeHistoricalDatas(
      where: { tokenAddress: $tokenAddress, timestamp_lt: $timestamp }
      first: 1
      orderBy: timestamp
      orderDirection: desc
    ) {
      tradeVolumeEth
      price
    }
  }
`
