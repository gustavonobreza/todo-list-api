import express from 'express'
import 'express-async-errors' // To resolve bugs in async router functions of express
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import routes from './router'
import { ErrorHandle } from './util/errorHandler'
import { logger } from './util/logger'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.use(logger())
app.use(routes(prisma))

app.use(ErrorHandle())

export default () => app
