import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
    // todos os parâmetros que vêm do req.query são strings
  })

  const { query, page } = searchGymBodySchema.parse(request.body)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.run({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}
