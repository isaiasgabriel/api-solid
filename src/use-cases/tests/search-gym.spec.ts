import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from '../search-gym'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymRepository)
  })

  it('should be able to search a gym', async () => {
    await gymRepository.create({
      title: 'Strength Gym',
      latitude: 0,
      longitude: 0,
    })
    await gymRepository.create({
      title: 'Power Gym',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.run({ query: 'Power', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Power Gym' })])
  })

  it('should be able to search a gym paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `SOLID Gym ${i}`,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.run({ query: 'SOLID Gym', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'SOLID Gym 21' }),
      expect.objectContaining({ title: 'SOLID Gym 22' }),
    ])
  })
})
