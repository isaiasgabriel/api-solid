import { Gym, Prisma } from '@prisma/client'
import {
  GymsRepositoryInterface,
  SearchNearbyGymsParams,
} from '../gyms-repository-interface'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/getDistance'

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      throw new Error()
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)
    return gym
  }

  async searchGyms(query: string, page: number) {
    return this.items
      .filter((gyms) => gyms.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async searchNearbyGyms(params: SearchNearbyGymsParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )
      return distance < 10
    })
  }
}
