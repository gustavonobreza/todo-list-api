import express from 'express'
import cors from 'express'
import 'express-async-errors' // To resolve bugs in async router functions of express
import db from './repositories/database'
import TodoRepository from './repositories/Todo'

const app = express()

app.use(cors())

const todoRepository = new TodoRepository(db)

app.get('/', async (req, res) => {
  res.send(await todoRepository.all())
})

export default () => app
