import { NowResponse } from "@vercel/node";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function return200(res: NowResponse, body: any): NowResponse {
  return res.status(200).json(body);
}

export function returnError(res: NowResponse, code: number, message: string): NowResponse {
  return res.status(code).json({
    error: {
      code,
      message,
    },
  });
}

export function return400(res: NowResponse, message = "Bad request"): NowResponse {
  return returnError(res, 400, message);
}

export function return500(res: NowResponse, error: Error): NowResponse {
  return returnError(res, 500, error.message);
}
