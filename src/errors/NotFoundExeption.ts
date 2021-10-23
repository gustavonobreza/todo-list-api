import type { Request } from 'express'
import HttpStatusCode from './HttpCodes'
import { HttpError } from './HttpError'

export class NotFoundExeption extends HttpError {
  public readonly name: string
  constructor(public message: string, req?: Request) {
    super(HttpStatusCode.NOT_FOUND, message, req)
    this.name = 'NOT_FOUND'
  }
}
