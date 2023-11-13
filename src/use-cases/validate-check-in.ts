import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository-interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInError } from './errors/late-check-in-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async run({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findCheckInById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const timeDifferenceBetweenCheckInCreationTillValidation = dayjs(
      new Date(),
    ).diff(checkIn.created_at, 'minutes')

    if (timeDifferenceBetweenCheckInCreationTillValidation > 20) {
      throw new LateCheckInError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
