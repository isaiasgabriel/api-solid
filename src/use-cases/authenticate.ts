import { UsersRepository } from '@/repositories/users-repository-interface'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private dbRepository: UsersRepository) {}

  async run({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.dbRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // Boolean => "does","has","is"
    // não esquecer desse await caso contrário a validação de senha
    // não vai ser feita
    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
