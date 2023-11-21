import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // essa função vai
  // automaticamente validar o token da nossa aplicação

  // console.log(request.headers)
  // console.log(request.user.sub)

  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.run({
    userId: request.user.sub.toString(),
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
