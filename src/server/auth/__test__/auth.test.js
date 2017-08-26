import { User } from '../../modules/user/models'
import app from '../../app'
import request from 'supertest'

const user = {
  username: 'test',
  password: '123',
  fullname: 'test test',
  role: 'driver',
  gender: 'male',
  active: false,
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
  afterEach(async () => {
    await User.remove({ username: 'test' })
  })

  test('user register', async () => {
    const res = await request(app).post('/auth/register').send(user)
    expect(res.statusCode).toBe(200)
  })

  test('user login success', async () => {
    await request(app).post('/auth/register').send(user)
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'test', password: '123' })
    expect(res.statusCode).toBe(200)
  })

  test('user login failure', async () => {
    await request(app).post('/auth/register').send(user)
    try {
      const res = await request(app)
        .post('/auth/login')
        .send({ username: 'test', password: '1234' })
      expect(res.statusCode).toBe(401)
    } catch (error) {
      console.log('error')
    }
  })
})
