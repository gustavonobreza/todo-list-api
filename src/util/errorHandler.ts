import type { NextFunction, Request, Response } from 'express'

export const ErrorHandle =
  () => (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      error: err?.message || err,
    })
  }
