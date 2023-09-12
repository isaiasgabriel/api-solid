import { fastify } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    email: 'sasuke@gmail.com',
    name: 'sasuke',
  },
})

export const app = fastify()
