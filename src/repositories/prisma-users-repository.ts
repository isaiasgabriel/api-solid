import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    // Return the user in case the use-case
    // Wants to work with the object
    return user
  }
}
