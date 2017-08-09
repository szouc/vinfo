import { User } from '../../api/shared/models'
import app from '../../app'
import mongoose from 'mongoose'
import request from 'supertest'

mongoose.Promise = global.Promise

const user = {
  'username': 'test',
  'password': '123',
  'fullname': 'test test',
  'role': 'driver',
  'gender': 'male',
  'active': true,
  'driver': {
    'license': 'ADBDE12345',
    'cert': {
      'number': '1234123541sdfasdf',
      'expired': '2017-08-05'
    },
    'idFront': './hello',
    'idBack': './End'
  }
}

describe('Authenticate', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://test:test@localhost:27017/test')
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  beforeEach(() => {
  })

  test('user register', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(user)
    expect(res.statusCode).toBe(200)
    expect(res.body.username).toBe(user.username)
  })

  test('user login success', async () => {
    await request(app)
      .post('/auth/register')
      .send(user)
    const res = await request(app)
      .post('/auth/login')
      .send({'username': 'szouc', 'password': '123'})
    expect(res.statusCode).toBe(302)
  })

  test('user login failure', async () => {
    await request(app)
      .post('/auth/register')
      .send(user)
    const res = await request(app)
      .post('/auth/login')
      .send({'username': 'szouc', 'password': '1234'})
    expect(res.statusCode).toBe(302)
  })

  afterEach(() => {
    User.remove()
      .then(() => console.log('Remove user'))
      .catch((e) => console.log(e.message))
  })
})
