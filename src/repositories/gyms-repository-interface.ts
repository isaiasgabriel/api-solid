import { Gym, Prisma } from '@prisma/client'

export interface SearchNearbyGymsParams {
  latitude: number
  longitude: number
}

export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchGyms(query: string, page: number): Promise<Gym[]>
  searchNearbyGyms(params: SearchNearbyGymsParams): Promise<Gym[]>
}

/** Ao usar params deixa de forma mais explicita latitude e longitude:
 * searchNearbyGyms({latitude:40.7070626,longitude:-74.0142957}){}
 */
