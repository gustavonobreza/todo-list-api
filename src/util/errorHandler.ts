import type { NextFunction, Request, Response } from 'express'
import HttpStatusCode from '../errors/HttpCodes'
import { HttpError } from '../errors/HttpError'

export const ErrorHandle =
  () =>
  (err: HttpError | any, req: Request, res: Response, next: NextFunction) => {
    req.error = true

    if (err instanceof HttpError) {
      res.status(err.code).json({
        error: err.message,
      })
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Error',
      })
    }
  }
