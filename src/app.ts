import express from 'express'
import 'express-async-errors' // To resolve bugs in async router functions of express
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import routes from './router'
import { ErrorHandle } from './util/errorHandler'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.use(routes(prisma))

app.use(ErrorHandle())

export default () => app
