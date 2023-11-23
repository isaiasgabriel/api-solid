import { makeSearchNearbyGymsUseCase } from '@/use-cases/factories/make-search-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const searchNearbyBodySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = searchNearbyBodySchema.parse(
    request.query,
  )

  const searchNearbyGymUseCase = makeSearchNearbyGymsUseCase()

  const { gyms } = await searchNearbyGymUseCase.run({
    userLatitude,
    userLongitude,
  })

  return reply.status(200).send({ gyms })
}
