import { registerUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // why async ? because we'll use prisma
  const requestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = requestSchema.parse(request.body)

  try {
    await registerUseCase({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send('User Created')
}
