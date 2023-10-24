import { Gym, Prisma } from '@prisma/client'

export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchGyms(query: string, page: number): Promise<Gym[]>
}
