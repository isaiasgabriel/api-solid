import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsRepository } from '@/repositories/check-ins-repository-interface'
import { CheckInHistoryUseCase } from '../check-in-history'

let checkInsRepository: CheckInsRepository
let sut: CheckInHistoryUseCase
// sut -> system under test

describe('Check-In History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInHistoryUseCase(checkInsRepository)
  })

  it('should be able to get check-in history', async () => {
    await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-2',
    })

    const { checkIns } = await sut.run({
      userId: 'user-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-1' }),
      expect.objectContaining({ gym_id: 'gym-2' }),
    ])
  })

  it('should be able to get the check-in history paginated', async () => {
    // Vou criar 22 check ins
    // Cada página de check ins tem 20 registros (1-20)
    // Ao passar a segunda página pra ser retornada
    // eu espero o check-in 21 e 22

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'user-1',
        gym_id: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.run({
      userId: 'user-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
