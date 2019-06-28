import { NowRequest, NowResponse } from '@now/node'

import client from '../_apollo/client'
import { ALL_TOKENS } from '../_apollo/queries'
import { return200, return500 } from '../_shared'
import ReturnData, { Token } from './types'

export default async function(_: NowRequest, res: NowResponse): Promise<NowResponse> {
  return client
    .query({ query: ALL_TOKENS, fetchPolicy: 'no-cache' })
    .then(
      (result: any): NowResponse => {
        const {
          data: { uniswaps }
        } = result
        const { exchanges } = uniswaps[0]

        const tokens: Token[] = exchanges.map(
          (exchange: any): Token => {
            const { tokenAddress, tokenName, tokenSymbol } = exchange
            return {
              token_address: tokenAddress,
              ...(tokenName ? { token_name: tokenName } : {}),
              ...(tokenSymbol ? { token_symbol: tokenSymbol } : {})
            }
          }
        )

        const returnData: ReturnData = {
          tokens,
          tokens_count: tokens.length
        }

        return return200(res, returnData)
      }
    )
    .catch(
      (error): NowResponse => {
        return return500(res, error)
      }
    )
}
