import request from 'supertest'
import { app } from '@/app'
import { expect, beforeAll, afterAll, it, test } from 'vitest'

test('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
