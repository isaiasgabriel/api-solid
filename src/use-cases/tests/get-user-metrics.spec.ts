import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsRepository } from '@/repositories/check-ins-repository-interface'
import { GetUserMetricsUseCase } from '../get-user-metrics'

let checkInsRepository: CheckInsRepository
let sut: GetUserMetricsUseCase
// sut -> system under test

describe('Check-In History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get the check-in counter', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'user-1',
        gym_id: `gym-${i}`,
      })
    }

    const { checkInsCounter } = await sut.run({
      userId: 'user-1',
    })

    expect(checkInsCounter).toEqual(22)
  })
})
