import gql from 'graphql-tag'

export const STATUS = gql`
  query uniswaps {
    uniswaps(where: { id: "1" }) {
      id
    }
  }
`

export const ALL_PAIRS = gql`
  query exchanges {
    exchanges(orderBy: ethBalance, orderDirection: desc) {
      tokenAddress
      tokenSymbol
      tokenName
    }
  }
`

export const PAIR_HISTORICAL_DATA = gql`
  query exchangeHistoricalDatas($tokenAddress: String!, $timestamp: Int!) {
    exchanges(where: { tokenAddress: $tokenAddress }) {
      tradeVolumeEth
      tradeVolumeToken
      price
    }

    exchangeHistoricalDatas(
      where: { tokenAddress: $tokenAddress, timestamp_lt: $timestamp }
      first: 1
      orderBy: timestamp
      orderDirection: desc
    ) {
      tradeVolumeEth
      tradeVolumeToken
      price
    }
  }
`
