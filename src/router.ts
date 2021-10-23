import type { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import HttpStatusCode from './errors/HttpCodes'
import TodoService from './todoService'

export default (prisma: PrismaClient) => {
  const router = Router()

  router.all('/', async (req, res, next) => {
    res.sendStatus(HttpStatusCode.NOT_IMPLEMENTED)
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
