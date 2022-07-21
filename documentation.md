# Documentation

All Summitswap pairs consist of two different tokens. BNB is not a native currency in Summitswap, and is represented only by WBNB in the pairs. 

The canonical WBNB address used by the Summitswap interface is `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`.

Results are cached for 5 minutes (or 300 seconds).

## [`/summary`](https://api.summitswap.finance/api/summary)

Returns data for the top ~1000 SummitSwap pairs, sorted by reserves. 

### Request

`GET https://api.summitswap.finance/api/summary`

### Response

```json5
{
  "updated_at": 1234567,              // UNIX timestamp
  "data": {
    "0x..._0x...": {                  // BEP20 token addresses, joined by an underscore
      "price": "...",                 // price denominated in token1/token0
      "base_volume": "...",           // last 24h volume denominated in token0
      "quote_volume": "...",          // last 24h volume denominated in token1
      "liquidity": "...",             // liquidity denominated in USD
      "liquidity_BNB": "..."          // liquidity denominated in BNB
    },
    // ...
  }
}
```

## [`/tokens`](https://api.summitswap.finance/api/tokens)

Returns the tokens in the top ~1000 pairs on SummitSwap, sorted by reserves.

### Request

`GET https://api.summitswap.finance/api/tokens`

### Response

```json5
{
  "updated_at": 1234567,              // UNIX timestamp
  "data": {
    "0x...": {                        // the address of the BEP20 token
      "name": "...",                  // not necessarily included for BEP20 tokens
      "symbol": "...",                // not necessarily included for BEP20 tokens
      "price": "...",                 // price denominated in USD
      "price_BNB": "...",             // price denominated in BNB
    },
    // ...
  }
}
```

## [`/tokens/0x...`](https://api.summitswap.finance/api/tokens/0x8094e772fA4A60bdEb1DfEC56AB040e17DD608D5)

Returns the token information, based on address.

### Request

`GET https://api.summitswap.finance/api/tokens/0x8094e772fA4A60bdEb1DfEC56AB040e17DD608D5`

### Response

```json5
{
  "updated_at": 1234567,              // UNIX timestamp
  "data": {
    "name": "...",                    // not necessarily included for BEP20 tokens
    "symbol": "...",                  // not necessarily included for BEP20 tokens
    "price": "...",                   // price denominated in USD
    "price_BNB": "...",               // price denominated in BNB
  }
}
```

## [`/pairs`](https://api.summitswap.finance/api/pairs)

Returns data for the top ~1000 SummitSwap pairs, sorted by reserves.

### Request

`GET https://api.summitswap.finance/api/pairs`

### Response

```json5
{
  "updated_at": 1234567,              // UNIX timestamp
  "data": {
    "0x..._0x...": {                  // the asset ids of BNB and BEP20 tokens, joined by an underscore
      "pair_address": "0x...",        // pair address
      "base_name": "...",             // token0 name
      "base_symbol": "...",           // token0 symbol
      "base_address": "0x...",        // token0 address
      "quote_name": "...",            // token1 name
      "quote_symbol": "...",          // token1 symbol
      "quote_address": "0x...",       // token1 address
      "price": "...",                 // price denominated in token1/token0
      "base_volume": "...",           // volume denominated in token0
      "quote_volume": "...",          // volume denominated in token1
      "liquidity": "...",             // liquidity denominated in USD
      "liquidity_BNB": "..."          // liquidity denominated in BNB
    },
    // ...
  }
}
```

## [`/coinmarketcap/pairs`](https://api.summitswap.finance/api/coinmarketcap/pairs)

Returns data for the top ~1000 SummitSwap pairs, sorted by reserves.

### Request

`GET https://api.summitswap.finance/api/coinmarketcap/pairs`

### Response

```json5
{
  "updated_at": 1234567,              // UNIX timestamp
  "data": {
    "0x..._0x...": {                  // the asset ids of BNB and BEP20 tokens, joined by an underscore
      "base_id": "0x...",             // token0 address
      "base_name": "...",             // token0 name
      "base_symbol": "...",           // token0 symbol
      "quote_id": "0x...",            // token1 address
      "quote_name": "...",            // token1 name
      "quote_symbol": "...",          // token1 symbol
      "last_price": "...",            // price denominated in token1/token0
      "base_volume": "...",           // volume denominated in token0
      "quote_volume": "...",          // volume denominated in token1
    },
    // ...
  }
}
```

## [`/coingecko/pairs`](https://api.summitswap.finance/api/coingecko/pairs)

Returns data for the top ~1000 SummitSwap pairs, sorted by reserves.

### Request

`GET https://api.summitswap.finance/api/coingecko/pairs`

### Response

```json5
{
  "0x..._0x...": {                  // the asset ids of BNB and BEP20 tokens, joined by an underscore
    "ticker_id": "0x..._0x...",     // Identifier of a ticker address_address
    "base": "...",                  // token0 symbol
    "target": "...",                // token1 symbol
    "pool_id": "...",               // pool/pair address
  },
  // ...
}
```

## [`/coingecko/tickers`](https://api.summitswap.finance/api/coingecko/tickers)

Returns market related statistics data from the top ~1000 SummitSwap pairs, sorted by reserves.

### Request

`GET https://api.summitswap.finance/api/coingecko/tickers`

### Response

```json5
{
  "0x..._0x...": {                  // the asset ids of BNB and BEP20 tokens, joined by an underscore
    "ticker_id": "0x..._0x...",     // Identifier of a ticker address_address
    "base_currency": "...",         // token0 symbol
    "target_currency": "...",       // token1 symbol
    "last_price": "...",            // price denominated in token1/token0
    "base_volume": "...",           // token0 volume
    "target_volume": "...",         // token1 volume
    "pool_id": "...",               // pool/pair address
  },
  // ...
}
```

## [`/coingecko/orderbook`](https://api.summitswap.finance/api/coingecko/orderbook)

Returns order book of any given trading pair, split into two different arrays for bid and ask orders.

### Request

`GET https://api.summitswap.finance/api/coingecko/orderbook`

### Response

```json5
{
  "ticker_id": "0x..._0x...",       // Identifier of a ticker 
  "timestamp": 1234567,             // UNIX timestamp
  "bids": [                         // The offer price and quantity for each bid order
    [123, 456],
    [789, 123],
    // ...
  ],
  "asks": [                         // The ask price and quantity for each ask order

    [123, 456],
    [789, 123],
    // ...
  ],
  // ...
}
```

