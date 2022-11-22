import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';


import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import tasksRoutes from './routes/tasks.routes'

dotenv.config()

export const prisma = new PrismaClient()

const server = express()

server.use(express.json());
server.use(cors());

server.use('/auth', authRoutes)
server.use('/users', userRoutes)
server.use('/tasks', tasksRoutes)


server.listen(process.env.PORT, ()=>{
    console.log(`Funcionando en el puerto ${process.env.PORT}`)
})