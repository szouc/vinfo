import { User } from '../../modules/user/models'
import app from '../../app'
import request from 'supertest'

const user = {
  username: 'test',
  password: '123',
  fullname: 'test test',
  role: 'driver',
  gender: 'male',
  active: true,
  driver: {
    license: 'ADBDE12345',
    cert: {
      number: '1234123541sdfasdf',
      expired: '2017-08-05'
    },
    idFront: './hello',
    idBack: './End'
  }
}

describe('Authenticate', () => {
  const agent = request.agent(app)
  afterAll(async () => {
    await User.remove()
  })

  test('user register', async () => {
    expect.assertions(1)
    const res = await agent.post('/auth/register').send(user)
    expect(res.statusCode).toBe(200)
  })

  test('user login success', async () => {
    expect.assertions(1)
    const res = await agent
      .post('/auth/login')
      .send({ username: 'test', password: '123' })
    expect(res.statusCode).toBe(200)
  })

  test('user isAuthenticate', async () => {
    expect.assertions(1)
    const res = await agent.get('/auth')
    expect(res.statusCode).toBe(200)
  })

  test('user (driver) cannt reset password', async () => {
    expect.assertions(1)
    const res = await agent
      .post('/auth/reset_password')
      .send({ username: 'test', password: '12345' })
    expect(res.statusCode).not.toBe(200)
  })

  test('user logout success', async () => {
    expect.assertions(1)
    const res = await agent.get('/auth/logout')
    expect(res.statusCode).toBe(200)
  })

  test('user login failure', async () => {
    expect.assertions(1)
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'test', password: '1234' })
    expect(res.statusCode).not.toBe(200)
  })

  test('user isUnauthenticated', async () => {
    expect.assertions(1)
    const res = await agent.get('/auth')
    expect(res.statusCode).not.toBe(200)
  })
})
