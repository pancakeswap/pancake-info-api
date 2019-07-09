import gql from 'graphql-tag'

export const STATUS = gql`
  query uniswaps {
    uniswaps(where: { id: "1" }) {
      id
    }
  }
`

// this should probably be filtering on ethBalance_gt e.g. .01, but seems like the graph doesn't support this?
export const ALL_PAIRS = gql`
  query exchanges {
    exchanges(where: { addLiquidityCount_gte: "1" }, orderBy: ethBalance, orderDirection: desc) {
      tokenAddress
    }
  }
`

export const PAIR_HISTORICAL_DATA = gql`
  query exchangeHistoricalDatas($tokenAddress: String!, $timestamp: Int!) {
    exchanges(where: { tokenAddress: $tokenAddress }) {
      tokenName
      tokenSymbol

      ethBalance
      price

      tradeVolumeEth
      tradeVolumeToken
    }

    exchangeHistoricalDatas(
      where: { tokenAddress: $tokenAddress, timestamp_lt: $timestamp }
      first: 1
      orderBy: timestamp
      orderDirection: desc
    ) {
      tradeVolumeEth
      tradeVolumeToken
    }
  }
`
