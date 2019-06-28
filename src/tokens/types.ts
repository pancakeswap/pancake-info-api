export interface Token {
  token_address: string
  token_name?: string
  token_symbol?: string
}

export default interface ReturnData {
  tokens: Token[]
  tokens_count: number
}
