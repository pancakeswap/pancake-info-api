import { NowResponse } from '@now/node'

export function return200(res: NowResponse, body: any, maxAge: number): NowResponse {
  res.setHeader('Cache-Control', `max-age=0, s-maxage=${maxAge}`)
  res.status(200).json(body)
  return res
}

export function returnError(res: NowResponse, code: number, message: string): NowResponse {
  res.setHeader('Content-Type', 'application/json')

  res.status(code).json({
    errorCode: code,
    message
  })
  return res
}

export function return400(res: NowResponse, message: string = 'Bad request'): NowResponse {
  return returnError(res, 400, message)
}

export function return500(res: NowResponse, error: Error): NowResponse {
  return returnError(res, 500, error.message)
}
