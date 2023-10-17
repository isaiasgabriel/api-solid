import { expect, it, describe, beforeEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '../check-in'
import { CheckInsRepository } from '@/repositories/check-ins-repository-interface'
import { randomUUID } from 'crypto'
import { afterEach } from 'node:test'

let checkInsRepository: CheckInsRepository
let sut: CheckInUseCase
// sut -> system under test

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.run({
      userId: randomUUID(),
      gymId: randomUUID(),
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2023, 9, 16, 8, 0, 0))

    await sut.run({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    await expect(() =>
      sut.run({
        userId: 'user-1',
        gymId: 'gym-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 9, 16, 8, 0, 0))

    await sut.run({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    vi.setSystemTime(new Date(2023, 9, 17, 8, 0, 0))

    const { checkIn } = await sut.run({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
