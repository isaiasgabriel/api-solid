import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface'
import { Gym } from '@prisma/client'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymRepository: GymsRepositoryInterface) {}

  async run({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchGyms(query, page)
    return { gyms }
  }
}
