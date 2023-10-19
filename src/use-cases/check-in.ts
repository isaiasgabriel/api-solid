import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository-interface'
import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/getDistance'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitute: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepositoryInterface,
  ) {}

  async run({
    userId,
    gymId,
    userLatitude,
    userLongitute,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calcular distância entre usuário e academia

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitute },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE = 0.1 // 0.1 km -> 100m

    if (distance > MAX_DISTANCE) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInsRepository.findUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
