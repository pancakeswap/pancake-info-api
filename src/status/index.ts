import { NowRequest, NowResponse } from '@now/node'

import client from '../_apollo/client'
import { STATUS } from '../_apollo/queries'
import { return200, return500 } from '../_shared'

export default async function(_: NowRequest, res: NowResponse): Promise<NowResponse> {
  return client
    .query({ query: STATUS, fetchPolicy: 'no-cache' })
    .then((): NowResponse => return200(res, 'Success.'))
    .catch((error): NowResponse => return500(res, error))
}
