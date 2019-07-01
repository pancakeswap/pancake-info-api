import { NowRequest, NowResponse } from '@now/node'
import { getAddress } from '@ethersproject/address'

import client from '../_apollo/client'
import { ALL_PAIRS } from '../_apollo/queries'
import { return200, return500 } from '../_shared'
import ReturnData, { Pair } from './types'

export default async function(_: NowRequest, res: NowResponse): Promise<NowResponse> {
  return client
    .query({ query: ALL_PAIRS, fetchPolicy: 'no-cache' })
    .then(
      (result: any): NowResponse => {
        const {
          data: { exchanges }
        } = result

        const pairs: Pair[] = exchanges.map(
          (pair: any): Pair => {
            const { tokenAddress, tokenName, tokenSymbol } = pair
            return {
              token_address: getAddress(tokenAddress),
              ...(tokenName && tokenName !== 'unknown' ? { token_name: tokenName } : {}),
              ...(tokenSymbol && tokenSymbol !== 'unknown' ? { token_symbol: tokenSymbol } : {})
            }
          }
        )

        const returnData: ReturnData = {
          pairs,
          pairs_count: pairs.length
        }

        return return200(res, returnData)
      }
    )
    .catch((error): NowResponse => return500(res, error))
}
