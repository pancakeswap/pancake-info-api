export interface Pair {
  token_address: string
  token_name?: string
  token_symbol?: string
}

export default interface ReturnData {
  pairs: Pair[]
  pairs_count: number
}
