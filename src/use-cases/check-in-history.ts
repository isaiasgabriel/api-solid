import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository-interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInHistoryUseCaseRequest {
  userId: string
  page: number
}

interface CheckInHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class CheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async run({
    userId,
    page,
  }: CheckInHistoryUseCaseRequest): Promise<CheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    if (!checkIns) {
      throw new ResourceNotFoundError()
    }

    return {
      checkIns,
    }
  }
}
