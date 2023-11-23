import { makeCheckInHistoryUseCase } from '@/use-cases/factories/make-check-in-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    // todos os parâmetros que vêm do req.query são strings
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const checkInHistoryUseCase = makeCheckInHistoryUseCase()

  const { checkIns } = await checkInHistoryUseCase.run({
    userId: request.user.sub.toString(),
    page,
  })

  return reply.status(200).send({ checkIns })
}
