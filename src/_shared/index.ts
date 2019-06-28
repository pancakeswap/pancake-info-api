import { NowResponse } from '@now/node'

export function return200(res: NowResponse, body?: string | any): NowResponse {
  return typeof body === 'string' ? res.status(200).send(body) : res.status(200).json(body)
}

export function return400(res: NowResponse): NowResponse {
  return res.status(400).send('Invalid request.')
}

export function return500(res: NowResponse, error: Error): NowResponse {
  console.error(error)
  return res.status(500).send('An unknown error occurred.')
}
