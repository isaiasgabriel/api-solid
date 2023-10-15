import { UsersRepository } from '@/repositories/users-repository-interface'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private dbRepository: UsersRepository) {}

  async run({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
    // const prismaUserRepository = new PrismaUserRepository()

    const userWithSameEmail = await this.dbRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.dbRepository.create({
      name,
      email,
      password_hash,
    })

    // return inside an object
    // incase in the future we want
    // to return more data
    return {
      user,
    }
  }
}
