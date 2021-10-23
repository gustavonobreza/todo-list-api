import type { Request } from 'express'
import HttpStatusCode from './HttpCodes'
import { HttpError } from './HttpError'

export class BadRequestExeption extends HttpError {
  public readonly name: string
  constructor(public message: string, req?: Request) {
    super(HttpStatusCode.BAD_REQUEST, message, req)
    this.name = 'BAD_REQUEST'
  }
}
