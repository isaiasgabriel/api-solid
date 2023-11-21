import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInHistoryUseCase } from '../check-in-history'

export function makeCheckInHistoryUseCase() {
  const usersRepository = new PrismaCheckInsRepository()
  const useCase = new CheckInHistoryUseCase(usersRepository)

  return useCase
}
