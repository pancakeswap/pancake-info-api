# Endpoints

All PancakeSwap pairs consist of two different tokens. BNB is not a native currency in PancakeSwap, and is represented only by WBNB in the pairs. 

The canonical WBNB address used by the PancakeSwap interface is `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`.

Results are edge-cached for 1 minute (or 60 seconds) and refreshed in background (`stale-while-revalidate`).

## [`/summary`](https://api.pancakeswap.info/api/summary)

Returns data for the top ~1000 PancakeSwap pairs, sorted by reserves. 

### Request

`GET https://api.pancakeswap.info/api/summary`

### Response

```json5
{
  "0x..._0x...": {                  // the asset ids of the BEP20 tokens (i.e. token addresses), joined by an underscore
    "last_price": 1.234,            // denominated in token0/token1
    "base_volume": 123.456,         // last 24h volume denominated in token0
    "quote_volume": 1234.56,        // last 24h volume denominated in token1
    "liquidity": 1234.56,           // liquidity denominated in USD
    "liquidity_BNB": 1234.56        // liquidity denominated in BNB
  },
  // ...
}
```

## [`/tokens`](https://api.pancakeswap.info/api/tokens)

Returns the tokens in the top ~1000 pairs on PancakeSwap, sorted by reserves. 

### Request

`GET https://api.pancakeswap.info/api/tokens`

### Response

```json5
{
  "updated_at": 1234567,    // UNIX timestamp
  "data": {
    "0x...": {              // the address of the BEP20 token
      "name": "...",        // not necessarily included for BEP20 tokens
      "symbol": "...",      // not necessarily included for BEP20 tokens
      "price": 1.234,       // denominated in USD
      "price_BNB": 1.234,   // always 0
    },
    // ...
  }
}
```

## [`/tickers`](https://api.pancakeswap.info/api/tickers)

Returns data for the top ~1000 PancakeSwap pairs, sorted by reserves.

### Request

`GET https://api.pancakeswap.info/api/tickers`

### Response

```json5
{
  "0x..._0x...": {                  // the asset ids of BNB and BEP20 tokens, joined by an underscore
    "base_name": "...",             // token0 name
    "base_symbol": "...",           // token0 symbol
    "base_address": "0x...",        // token0 address
    "base_id": "0x...",             // token0 address
    "quote_name": "...",            // token1 name
    "quote_symbol": "...",          // token1 symbol
    "quote_address": "0x...",       // token1 address
    "quote_id": "0x...",            // token1 address
    "last_price": 1.234,            // the mid price as token1/token0
    "base_volume": 123.456,         // denominated in token0
    "quote_volume": 1234.56,        // denominated in token1
    "liquidity": 1234.56,           // liquidity denominated in USD
    "liquidity_BNB": 1234.56        // liquidity denominated in BNB
  },
  // ...
}
```

## `/orderbook/:pair`

Returns simulated orderbook data for the given PancakeSwap pair.
Since PancakeSwap has a continuous orderbook, fixed amounts in an interval are chosen for bids and asks, 
and prices are derived from the PancakeSwap formula (accounting for both slippage and fees paid to LPs). 

### Request

`GET https://api.pancakeswap.info/api/orderbook/:pair`

### URL Parameters

- `pair`: The asset ids of two BEP20 tokens, joined by an underscore, e.g. `0x..._0x...`. The first token address is considered the base in the response.

### Response

```json5
{
  "updated_at": 1234567, // UNIX timestamp
  "bids": [
    [12, 1.2],           // denominated in base token, quote token/base token
    [12, 1.1],           // denominated in base token, quote token/base token
    // ...
  ],
  "asks": [
    [12, 1.3],           // denominated in base token, quote token/base token
    [12, 1.4],           // denominated in base token, quote token/base token
    // ...
  ]
}
```
