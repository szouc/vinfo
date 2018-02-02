import { Company } from '../models'
import { User } from '../../user/models'
import app from '../../../app'
import request from 'supertest'
import * as Api from '../api.js'
import { data } from '../../../utils/mockData'

describe('Company Basic Operations', () => {
  let companyId
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.managers[0])
  })

  afterAll(async () => {
    await User.remove()
    await Company.remove()
  })

  test('Should create a company', async () => {
    expect.assertions(2)
    const res = await agent.post(Api.COMPANY_ROOT).send(data.companies[0])
    expect(res.statusCode).toBe(200)
    expect(res.body.result.name).toBe(data.companies[0].name)
  })

  test('Should not create a company by a duplicated company ', async () => {
    expect.assertions(1)
    const res = await agent.post(Api.COMPANY_ROOT).send(data.companies[0])
    expect(res.statusCode).toBe(400)
  })

  test('Should get all companies', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.COMPANY_ROOT)
    companyId = res.body.result[0]._id
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].name).toEqual(data.companies[0].name)
  })

  test('Should get company by id', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.COMPANY_ID.replace(/:id/, companyId))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.name).toEqual(data.companies[0].name)
  })

  test('Should not get company by a wrong id', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.COMPANY_ID.replace(/:id/, '59a25d39082e0f3954207953')
    )
    expect(res.statusCode).toBe(400)
  })

  test('Should modify a company', async () => {
    expect.assertions(2)
    const res = await agent
      .put(Api.COMPANY_ID.replace(/:id/, companyId))
      .send(data.companies[1])
    expect(res.statusCode).toBe(200)
    expect(res.body.result.addr).toEqual(data.companies[1].addr)
  })

  test('Should not modify a company by a wrong id', async () => {
    expect.assertions(1)
    const res = await agent
      .put(Api.COMPANY_ID.replace(/:id/, '59a25d39082e0f3954207953'))
      .send(data.companies[2])
    expect(res.statusCode).toBe(400)
  })

  test('Should delete a company', async () => {
    expect.assertions(2)
    const res = await agent.delete(Api.COMPANY_ID.replace(/:id/, companyId))
    expect(res.statusCode).toBe(200)
    expect(res.body.active).toBeFalsy()
  })

  test('Should not delete a company by a wrong id', async () => {
    expect.assertions(1)
    const res = await agent.delete(
      Api.COMPANY_ID.replace(/:id/, '59a25d39082e0f3954207953')
    )
    expect(res.statusCode).toBe(400)
  })

  test('Should find some company according to query', async () => {
    expect.assertions(1)
    await agent.post(Api.COMPANY_ROOT).send(data.companies[3])
    await agent.post(Api.COMPANY_ROOT).send(data.companies[4])
    const res = await agent
      .get(Api.COMPANY_QUERY)
      .query({ addr: data.companies[3].addr })
    expect(res.body.result).toHaveLength(1)
  })
})
