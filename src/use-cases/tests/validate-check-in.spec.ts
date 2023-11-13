import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { vi, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ValidateCheckInUseCase } from '../validate-check-in'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { LateCheckInError } from '../errors/late-check-in-error'

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    const { checkIn } = await sut.run({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.db[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.run({
        checkInId: 'check-in',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check-in after 20 minutes', async () => {
    vi.setSystemTime(new Date(2023, 10, 13, 13, 49, 9))

    const createdCheckIn = await checkInRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    const _21minutes = 1000 * 80 * 21

    vi.advanceTimersByTime(_21minutes)

    await expect(() =>
      sut.run({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInError)
  })
})
