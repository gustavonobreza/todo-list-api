import type { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { validateTime } from './util/validateTime'
import { BadRequestExeption } from './errors/BadRequestExeption'
import { NotFoundExeption } from './errors/NotFoundExeption'
import { IReqTodoInput, IServices } from './types'

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
      let { title, description, completed, target } = req.body as IReqTodoInput
      if (!title) {
        throw new BadRequestExeption('title is required!', req)
      }

      target &&= validateTime(target)

      const inserted = await prisma.todo.create({
        data: {
          id: randomUUID(),
          title,
          description,
          completed,
          target: !!target ? new Date(target).toISOString() : undefined,
        },
      })
      res.json(inserted)
    },
    get: async (req, res) => {
      const id = req.params.id
      if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
        throw new BadRequestExeption('invalid id', req)
      }
      const todo = await prisma.todo.findUnique({ where: { id } })
      if (!todo) {
        throw new NotFoundExeption('todo not found')
      }
      res.status(200).json(todo)
    },
    update: async (req, res) => {
      const id = req.params.id
      if (id.length !== 36) {
        throw new BadRequestExeption('invalid id', req)
      }

      if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
        throw new BadRequestExeption('invalid id', req)
      }

      const exists = await prisma.todo.count({ where: { id }, take: 1 })
      if (!exists) {
        throw new NotFoundExeption('todo not found')
      }

      let { title, description, completed, target } = req.body as IReqTodoInput

      target &&= validateTime(target)

      const updated = await prisma.todo.update({
        where: { id },
        data: {
          description,
          title,
          updatedAt: new Date().toISOString(),
          completed,
          target,
        },
      })
      res.json(updated)
    },
    remove: async (req, res) => {
      const id = req.params.id
      if (id.length !== 36) {
        throw new BadRequestExeption('invalid id', req)
      }
      if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
        throw new BadRequestExeption('invalid id', req)
      }

      const exists = await prisma.todo.count({ where: { id }, take: 1 })
      if (!exists) {
        throw new NotFoundExeption('todo not found')
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
        throw new BadRequestExeption('invalid id', req)
      }

      const exists = await prisma.todo.findFirst({
        where: { id },
        select: { completed: true },
      })

      if (!exists) {
        throw new NotFoundExeption('todo not found')
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
