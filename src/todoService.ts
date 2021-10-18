import type { NextFunction, Request, Response } from 'express'
import type { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

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

type IReqTodoInput = {
  title: string
  description?: string | null
  completed?: boolean
  target?: string | null
}

const matchUUID = {
  v4: /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  v5: /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
}

export default function (prisma: PrismaClient): IServices {
  return {
    all: async (req, res) => {
      const all = await prisma.todo.findMany()
      res.json({ data: all })
    },
    create: async (req, res) => {
      let { title, description } = req.body as IReqTodoInput
      if (!title) {
        throw new Error('title is required!')
      }
      if (!description) {
        description = ''
      }
      const inserted = await prisma.todo.create({
        data: {
          id: randomUUID(),
          title,
          description,
        },
      })
      res.json(inserted)
    },
    get: async (req, res) => {
      const id = req.params.id
      if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
        res.status(404).json({
          error: 'invalid id',
        })
        return
      }
      const todo = await prisma.todo.findUnique({ where: { id } })
      if (!todo) {
        res.status(404).json({ error: 'todo not found' })
        return
      }
      res.status(200).json(todo)
    },
    update: async (req, res) => {
      const id = req.params.id
      if (id.length !== 36) {
        res.status(404).json({
          error: 'invalid id',
        })
        return
      }
      if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
        res.status(404).json({
          error: 'invalid id',
        })
        return
      }

      const exists = await prisma.todo.count({ where: { id }, take: 1 })
      if (!exists) {
        res.status(404).json({ error: 'todo not found' })
        return
      }
      let { title, description } = req.body as IReqTodoInput
      if (!title || title.length < 3) {
        throw new Error('title is invalid!')
      }
      if (!description) {
        description = ''
      }
      const updated = await prisma.todo.update({
        where: { id },
        data: { description, title, updatedAt: new Date().toISOString() },
      })
      res.json(updated)
    },
    remove: async (req, res) => {
      const id = req.params.id
      if (id.length !== 36) {
        res.status(404).json({
          error: 'invalid id',
        })
        return
      }
      if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
        res.status(404).json({
          error: 'invalid id',
        })
        return
      }

      const exists = await prisma.todo.count({ where: { id }, take: 1 })
      if (!exists) {
        res.status(404).json({ error: 'todo not found' })
        return
      }

      prisma.todo
        .delete({ where: { id } })
        .then(() => {
          res.status(204).json({ ok: true })
        })
        .catch((e) => {
          throw new Error(e?.message || String(e))
        })
    },
    toggle: async (req, res) => {
      const id = req.params.id
      if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
        res.status(404).json({
          error: 'invalid id',
        })
        return
      }

      const exists = await prisma.todo.findFirst({
        where: { id },
        select: { completed: true },
      })

      if (!exists) {
        res.status(404).json({ error: 'todo not found' })
        return
      }

      const todo = await prisma.todo.update({
        where: { id },
        data: {
          completed: !exists.completed,
          updatedAt: new Date().toISOString(),
        },
      })

      res.status(200).json(todo)
    },
  }
}
