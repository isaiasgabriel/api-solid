import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Gym } from '@prisma/client'

interface SearchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}
interface SearchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchNearbyGymsUseCase {
  constructor(private gymRepository: InMemoryGymsRepository) {}

  async run({
    userLatitude,
    userLongitude,
  }: SearchNearbyGymsUseCaseRequest): Promise<SearchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchNearbyGyms({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
