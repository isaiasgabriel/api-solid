import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface'
import { Gym } from '@prisma/client'

interface SearchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}
interface SearchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchNearbyGymsUseCase {
  constructor(private gymRepository: GymsRepositoryInterface) {}

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
