import { Gym } from '@prisma/client'
import { GymsRepositoryInterface } from '../gyms-repository-interface'

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      throw new Error()
    }

    return gym
  }
}
