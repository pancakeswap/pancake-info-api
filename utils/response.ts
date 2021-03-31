import { VercelResponse } from "@vercel/node";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function return200(res: VercelResponse, body: any): VercelResponse {
  return res.status(200).json(body);
}

export function returnError(res: VercelResponse, code: number, message: string): VercelResponse {
  return res.status(code).json({
    error: {
      code,
      message,
    },
  });
}

export function return400(res: VercelResponse, message = "Bad request"): VercelResponse {
  return returnError(res, 400, message);
}

export function return500(res: VercelResponse, error: Error): VercelResponse {
  return returnError(res, 500, error.message);
}
