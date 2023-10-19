import { Gym, Prisma } from '@prisma/client'
import { GymsRepositoryInterface } from '../gyms-repository-interface'
import { randomUUID } from 'crypto'

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
}
