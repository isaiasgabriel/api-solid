import { Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository-interface'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findCheckInById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    })

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: {
    id: string
    created_at: Date
    validated_at: Date | null
    user_id: string
    gym_id: string
  }) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
    return checkIn
  }

  async countCheckIns(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
    return count
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20, // take = quantos itens vão retornar
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async findUserIdOnDate(userId: string, date: Date) {
    const beginOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: beginOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
    return checkIn
  }
}
