import express, { NextFunction, Request, Response } from 'express'
import cors from 'express'
import 'express-async-errors' // To resolve bugs in async router functions of express
import db from './repositories/database'
import TodoRepository from './repositories/TodoRepository'

const app = express()

app.use(cors())

const todoRepository = new TodoRepository(db)

app.get('/', async (req, res) => {
  res.json({ data: await todoRepository.all() })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: err,
  })
})

export default () => app
