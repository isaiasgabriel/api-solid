import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfile } from '../get-user-profile'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new GetUserProfile(usersRepository)

  return useCase
}
