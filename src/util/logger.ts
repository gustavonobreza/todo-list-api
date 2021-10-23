import type { NextFunction, Request, Response } from 'express'

export const logger =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now()

    next()
    if (!req.error) {
      new Promise(() => {
        const final = Date.now()

        const str = `[HTTP]:${(() =>
          (req.method && ' (' + req.method + ')') || ' ')()}${
          (req.statusCode && ' ' + req.statusCode + ' ') || ' '
        }${req.url} - ${final - start}ms`
        console.log(str)
      })
    }
    return
  }
