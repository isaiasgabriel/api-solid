import request from 'supertest'
import { app } from '@/app'
import { expect, it, test } from 'vitest'

test('Register (e2e)', () => {
  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
