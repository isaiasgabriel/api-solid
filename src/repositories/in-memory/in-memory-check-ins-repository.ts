import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository-interface'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public db: CheckIn[] = []

  async countCheckIns(userId: string) {
    return this.db.filter((item) => item.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.db.push(checkIn)

    return checkIn
  }

  async findUserIdOnDate(userId: string, date: Date) {
    const beginOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.db.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDay =
        checkInDate.isAfter(beginOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDay
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.db
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findCheckInById(checkInId: string) {
    const checkIn = this.db.find((checkIn) => checkIn.id === checkInId)
    if (!checkIn) {
      return null
    }
    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.db.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.db[checkInIndex] = checkIn
    }

    return checkIn
  }
}
