import express, { NextFunction, Request, Response } from 'express'
import { resolve } from 'path'
import cors from 'express'
import 'express-async-errors' // To resolve bugs in async router functions of express
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const matchUUID = {
  v4: /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  v5: /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
}

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.sendFile(resolve(__dirname, '..', 'assets', 'brasilia.jpg'))
})

app.get('/todos', async (req, res) => {
  const all = await prisma.todo.findMany()
  res.json({ data: all })
})

app.post('/todos', async (req, res) => {
  let { title, description } = req.body

  if (!title || title.length < 3) {
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
})

app.get('/todos/:id', async (req, res) => {
  const id = req.params.id

  if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
    return res.status(404).json({
      error: 'invalid id',
    })
  }

  const todo = await prisma.todo.findUnique({ where: { id } })

  if (!todo) return res.status(404).json({ error: 'todo not found' })

  return res.status(200).json(todo)
})

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id

  if (id.length !== 36) {
    return res.status(404).json({
      error: 'invalid id',
    })
  }

  if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
    return res.status(404).json({
      error: 'invalid id',
    })
  }

  const exists = await prisma.todo.count({ where: { id }, take: 1 })

  if (!exists) {
    return res.status(404).json({ error: 'todo not found' })
  }

  prisma.todo
    .delete({ where: { id } })
    .then(() => {
      return res.status(204).json({ ok: true })
    })
    .catch((e) => {
      throw new Error(e?.message || String(e))
    })
})

app.put('/todos/:id', async (req, res) => {
  const id = req.params.id

  if (id.length !== 36) {
    return res.status(404).json({
      error: 'invalid id',
    })
  }

  if (!id.match(matchUUID.v4) && !id.match(matchUUID.v5)) {
    return res.status(404).json({
      error: 'invalid id',
    })
  }

  const exists = await prisma.todo.count({ where: { id }, take: 1 })

  if (!exists) {
    return res.status(404).json({ error: 'todo not found' })
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

  return res.json(updated)
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: err?.message || err,
  })
})

export default () => app

type IReqTodoInput = {
  description: string
  title: string
}
