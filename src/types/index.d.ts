import type { NextFunction, Request, Response } from 'express'

type IReqTodoInput = {
  title: string
  description?: string | null
  completed?: boolean
  target?: string | null
}

type IHandlerService = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => Promise<void>

interface IServices {
  all: IHandlerService
  create: IHandlerService
  get: IHandlerService
  update: IHandlerService
  remove: IHandlerService
  toggle: IHandlerService
}
