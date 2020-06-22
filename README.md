# Uniswap API

The Uniswap API is a set of endpoints used by market aggregators (e.g. coinmarketcap.com) to surface Uniswap liquidity
and volume information. All information is fetched from the underlying subgraphs.

The API is designed around the CoinMarketCap
[requirements document](https://docs.google.com/document/d/1S4urpzUnO2t7DmS_1dc4EL4tgnnbTObPYXvDeBnukCg).

Prefer the Uniswap subgraph for any Uniswap queries whenever possible.

V2 Subgraph: https://github.com/Uniswap/uniswap-v2-subgraph
V1 Subgraph: https://github.com/graphprotocol/uniswap-subgraph 

## Segregated data

Note the data returned by the V1 and V2 endpoints is segregated, i.e. there are no endpoints for combined data from 
both Uniswap V1 and V2.

## V1 Documentation

The documentation of the `/v1/` endpoints is [here](./v1.md).

## V2 Documentation

The documentation of the `/v2/` endpoints is [here](./v2.md).
