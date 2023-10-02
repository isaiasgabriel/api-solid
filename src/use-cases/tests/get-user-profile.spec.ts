import { UsersRepository } from '@/repositories/prisma/users-repository-interface'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetUserProfile } from '../get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let usersRepository: UsersRepository
let sut: GetUserProfile

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfile(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.run({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get profile with wrong id', async () => {
    expect(() => sut.run({ userId: 'false-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
