import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInBodySchema = z.object({
    userId: z.string(),
    gymId: z.string(),
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userId, gymId, userLatitude, userLongitude } =
    createCheckInBodySchema.parse(request.body)

  const createCheckInUseCase = makeCheckInUseCase()

  const { checkIn } = await createCheckInUseCase.run({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send({ checkIn })
}
