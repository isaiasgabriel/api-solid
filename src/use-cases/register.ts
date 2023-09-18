import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private dbRepository: any) {}

  async run({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
    // const prismaUserRepository = new PrismaUserRepository()

    const userWithSameEmail = await this.dbRepository.emailVerification({
      email,
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.dbRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
