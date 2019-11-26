interface PairVolume {
  ETH: string
  [propname: string]: string
}

export interface PairData {
  token_address: string
  token_name?: string
  token_symbol?: string
  liquidity_last: string
  price_last: string
  volume_24h: PairVolume
}

// yeah datas isn't grammatical, so what
export interface PairDatas {
  pairs: PairData[]
  pairs_count: number
}
