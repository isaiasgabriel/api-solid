import { UsersRepository } from '@/repositories/users-repository-interface'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './error/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private dbRepository: UsersRepository) {}

  async run({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
    // const prismaUserRepository = new PrismaUserRepository()

    const userWithSameEmail = await this.dbRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.dbRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
