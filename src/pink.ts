import { NowRequest, NowResponse } from '@now/node'

import { return200 } from './_shared'

export default function(_: NowRequest, res: NowResponse): NowResponse {
  return return200(res, '#DC6BE5')
}
