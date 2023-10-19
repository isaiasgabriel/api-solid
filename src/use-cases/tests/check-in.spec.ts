import { expect, it, describe, beforeEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '../check-in'
import { CheckInsRepository } from '@/repositories/check-ins-repository-interface'
import { afterEach } from 'node:test'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { TwiceCheckInError } from '../errors/twice-check-in-error'
import { MaxDistanceError } from '../errors/max-distance-error'

let checkInsRepository: CheckInsRepository
let sut: CheckInUseCase
// sut -> system under test
let gymsRepository: InMemoryGymsRepository

describe('Check-In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym-1',
      title: 'test gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.run({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitute: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2023, 9, 16, 8, 0, 0))

    await sut.run({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitute: 0,
    })

    await expect(() =>
      sut.run({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: 0,
        userLongitute: 0,
      }),
    ).rejects.toBeInstanceOf(TwiceCheckInError)
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 9, 16, 8, 0, 0))

    await sut.run({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitute: 0,
    })

    vi.setSystemTime(new Date(2023, 9, 17, 8, 0, 0))

    const { checkIn } = await sut.run({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitute: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in distant', async () => {
    gymsRepository.items.push({
      id: 'gym-2',
      title: 'second gym',
      description: '',
      latitude: new Decimal(-25.432261),
      longitude: new Decimal(-49.3037493),
      phone: '',
    })

    await expect(() =>
      sut.run({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -25.4579786,
        userLongitute: -49.2046474,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
