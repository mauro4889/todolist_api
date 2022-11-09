import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import { userRouter } from './routes/user.routes';

import authRoutes from './routes/auth.routes'

dotenv.config()

export const prisma = new PrismaClient()

const server = express()

server.use(express.json());
server.use(cors());

server.use('/auth', authRoutes)
server.use('/users', userRouter)


server.listen(process.env.PORT, ()=>{
    console.log('Funcionando OK')
})