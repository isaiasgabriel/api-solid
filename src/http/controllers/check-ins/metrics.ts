import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCounter } = await getUserMetricsUseCase.run({
    userId: request.user.sub.toString(),
  })

  return reply.status(200).send({ checkInsCounter })
}
