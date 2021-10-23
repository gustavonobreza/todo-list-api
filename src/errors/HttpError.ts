import type { Request } from 'express'
import HttpStatusCode from './HttpCodes'

// TODO: Remove log reponsability and put it in looger module.
export class HttpError implements Error {
  public readonly name: string
  constructor(
    public code: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    public message: string = 'Some error occurred.',
    private req?: Request,
  ) {
    this.name = 'HTTP ERROR'
    const str = `[HTTP_ERROR]: ${code}${(() =>
      (req?.method && ' (' + req.method + ')') || ' ')()} - ${message}`
    console.log(str)
    if (!!req) req.error = true
  }
}
