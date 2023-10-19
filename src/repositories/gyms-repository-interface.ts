import { Gym } from '@prisma/client'

export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gym | null>
}
