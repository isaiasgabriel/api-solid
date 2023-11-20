import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchNearbyGymsUseCase } from '../search-nearby-gyms'

export function makeAuthenticateUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchNearbyGymsUseCase(gymsRepository)

  return useCase
}
