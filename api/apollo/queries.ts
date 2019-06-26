import gql from 'graphql-tag'

export const TOKEN_HISTORICAL_DATA = gql`
  query exchangeHistoricalDatas($tokenAddress: String!, $timestamp: Int!) {
    exchangeHistoricalDatas(
      where: { tokenAddress: $tokenAddress, timestamp_lt: $timestamp }
      first: 1
      orderBy: timestamp
      orderDirection: desc
    ) {
      tradeVolumeEth
    }
  }
`
