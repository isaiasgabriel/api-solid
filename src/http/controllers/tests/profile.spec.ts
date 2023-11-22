import request from 'supertest'
import { app } from '@/app'
import { expect, beforeAll, afterAll, it, test } from 'vitest'

test('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.statusCode).toEqual(
      expect.objectContaining({
        email: 'johndoe@gmail.com',
      }),
    )
  })
})
