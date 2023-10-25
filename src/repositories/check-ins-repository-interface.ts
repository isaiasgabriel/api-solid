import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  countCheckIns(userId: string): Promise<number>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findCheckInById(checkInId: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
