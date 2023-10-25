import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { SearchNearbyGymsUseCase } from '../search-nearby-gyms'

let gymRepository: InMemoryGymsRepository
let sut: SearchNearbyGymsUseCase

describe('Search Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchNearbyGymsUseCase(gymRepository)
  })

  it('should be able to return nearby gyms', async () => {
    await gymRepository.create({
      title: 'Pilates Fitness Botswana',
      latitude: -24.6630815,
      longitude: 25.9168745,
    })
    await gymRepository.create({
      title: 'Jacks Gym (iTowers)',
      latitude: -24.6521839,
      longitude: 25.8876651,
    })
    await gymRepository.create({
      title: 'Gaborone National Stadium',
      latitude: -24.6614666,
      longitude: 25.9074287,
    })
    await gymRepository.create({
      title: 'College of Cape Town Gym',
      latitude: -33.9716701,
      longitude: 18.5038653,
    })

    const { gyms } = await sut.run({
      userLatitude: -24.6641505,
      userLongitude: 25.8992941,
    })

    expect(gyms).toHaveLength(3)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Pilates Fitness Botswana' }),
      expect.objectContaining({ title: 'Jacks Gym (iTowers)' }),
      expect.objectContaining({ title: 'Gaborone National Stadium' }),
    ])
  })
})
