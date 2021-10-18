import type { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { resolve } from 'path'
import TodoService from './todoService'

export default (prisma: PrismaClient) => {
  const router = Router()

  router.get('/', async (req, res) => {
    res.sendFile(resolve('assets', 'brasilia.jpg'))
  })

  const { all, create, get, remove, update, toggle } = TodoService(prisma)

  router.get('/todos', all)
  router.post('/todos', create)
  router.get('/todos/:id', get)
  router.post('/todos/:id/toggle', toggle)
  router.delete('/todos/:id', remove)
  router.put('/todos/:id', update)

  return router
}
