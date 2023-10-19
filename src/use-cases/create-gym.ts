import { Gym } from '@prisma/client'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

interface CreateGymCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: InMemoryGymsRepository) {}

  async run({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    // return inside an object
    // incase in the future we want
    // to return more data
    return {
      gym,
    }
  }
}
