import { CheckInsRepository } from '@/repositories/check-ins-repository-interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCounter: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async run({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCounter = await this.checkInsRepository.countCheckIns(userId)

    if (!checkInsCounter) {
      throw new ResourceNotFoundError()
    }

    return {
      checkInsCounter,
    }
  }
}
