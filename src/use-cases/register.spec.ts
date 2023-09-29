import { expect, it, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.run({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.run({
      name: ' John Doe',
      email: 'johndoe2@gmail.com',
      password: 'password1234',
    })

    // will return boolean
    const isPasswordCorrectlyHashed = await compare(
      'password1234',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register the same email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.run({
      name: ' John Doe',
      email: 'johndoe2@gmail.com',
      password: 'password1234',
    })

    // Promises -> Resolve / Reject
    expect(() =>
      registerUseCase.run({
        name: ' John Doe',
        email: 'johndoe2@gmail.com',
        password: 'password1234',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
