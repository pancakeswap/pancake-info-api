import { NowRequest, NowResponse } from '@now/node'
import { returnError } from './utils'

export default async function(req: NowRequest, res: NowResponse): Promise<void> {
  returnError(res, 404, 'Invalid URL')
}
