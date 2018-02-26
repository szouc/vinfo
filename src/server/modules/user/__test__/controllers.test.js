import { data } from '../../../utils/mockData'
import { User } from '../models'
import app from '../../../app'
import request from 'supertest'
import * as Api from '../api'
import { DRIVER } from '../constants'

describe('User Base Operations', () => {
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.drivers[0])
    await agent.post('/auth/register').send(data.drivers[1])
    await agent.post('/auth/register').send(data.drivers[2])
    await agent.post('/auth/register').send(data.captains[0])
    await agent.post('/auth/register').send(data.managers[0])
  })

  afterAll(async () => {
    await User.remove()
  })

  test('Should fetch all users', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.USER_ALL)
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(5)
  })

  test('Should create a user', async () => {
    expect.assertions(2)
    const res = await agent.post(Api.USER_ROOT).send(data.managers[1])
    expect(res.statusCode).toBe(200)
    expect(res.body.result.username).toBe(data.managers[1].username)
  })

  test('Should fetch users by page_number = 1 and page_size = 2', async () => {
    expect.assertions(3)
    const res = await agent.get(`${Api.USER_ROOT}?page=1&size=2`)
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
    expect(res.body.pagination.pageNumber).toBe(1)
  })

  test('Should fetch users by role and page_number = 1 and page_size = 20', async () => {
    expect.assertions(3)
    const res = await agent.get(
      `${Api.USER_ROLE.replace(/:role/, DRIVER)}?page=1&size=20`
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(3)
    expect(res.body.pagination.pageNumber).toBe(1)
  })

  test('Should get a user by username', async () => {
    expect.assertions(2)
    const res = await agent.get(
      Api.USER_ID.replace(/:username/, data.drivers[2].username)
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result.username).toBe(data.drivers[2].username)
  })

  test('Should not get a user by username', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.USER_ID.replace(/:username/, 'anonymous'))
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe('没有找到用户。')
  })

  test('Should delete a user by username', async () => {
    expect.assertions(2)
    const res = await agent.delete(
      Api.USER_ID.replace(/:username/, data.drivers[2].username)
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result.n).toEqual(1)
  })

  test('Should not delete a user by a wrong username', async () => {
    expect.assertions(2)
    const res = await agent.delete(
      Api.USER_ID.replace(/:username/, data.drivers[4].username)
    )
    expect(res.statusCode).toBe(400)
    expect(res.body.ok).toBeFalsy()
  })

  test('Should update a user by username', async () => {
    expect.assertions(2)
    const res = await agent
      .put(Api.USER_ID.replace(/:username/, data.drivers[1].username))
      .send({ gender: 'female' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.gender).toBe('female')
  })

  test('Should change password', async () => {
    expect.assertions(2)
    const res = await agent
      .post(Api.USER_RESET_PASSWORD)
      .send({ username: data.drivers[0].username, password: '123456' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.username).toBe(data.drivers[0].username)
  })

  test('Should get the image url', async () => {
    expect.assertions(2)
    const res = await agent
      .post(Api.USER_LICENSE_UPLOAD)
      .attach('license', data.images[0].license, 'license.png')
    expect(res.statusCode).toBe(200)
    expect(res.body.ok).toBeTruthy()
  })
})
