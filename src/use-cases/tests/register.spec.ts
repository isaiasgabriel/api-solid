import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/prisma/users-repository-interface'

let usersRepository: UsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.run({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password', async () => {
    const { user } = await sut.run({
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
    await sut.run({
      name: ' John Doe',
      email: 'johndoe2@gmail.com',
      password: 'password1234',
    })

    // Promises -> Resolve / Reject
    expect(() =>
      sut.run({
        name: ' John Doe',
        email: 'johndoe2@gmail.com',
        password: 'password1234',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
