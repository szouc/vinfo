import { Company } from '../models'
import { User } from '../../user/models'
import app from '../../../app'
import request from 'supertest'
import {
  COMPANY_ROOT_API,
  COMPANY_ID_API,
  COMPANY_QUERY_API
} from '../routes.js'

const manager = {
  username: 'manager_company',
  password: '123',
  fullname: 'test manager',
  role: 'manager',
  gender: 'male',
  active: true
}

const company = {
  name: '青岛利特',
  addr: '市北区黑龙江路'
}

const company1 = {
  name: '青岛利特1',
  addr: '市北区黑龙江路'
}

const company2 = {
  name: '青岛利特2',
  addr: '市北区黑龙江路'
}

const modifiedCompany = {
  name: '青岛利特力',
  addr: '市北区黑龙江南路'
}

const query = {
  addr: '市北区黑龙江路'
}

let companyId
describe('Company Basic Operations', () => {
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(manager)
  })

  afterAll(async () => {
    await User.remove()
    await Company.remove()
  })

  test('Should create a company', async () => {
    expect.assertions(2)
    const res = await agent.post(COMPANY_ROOT_API).send(company)
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe(company.name)
  })

  test('Should not create a company', async () => {
    expect.assertions(1)
    const res = await agent.post(COMPANY_ROOT_API).send(company)
    expect(res.statusCode).toBe(500)
  })

  test('Should get all companies', async () => {
    expect.assertions(2)
    const res = await agent.get(COMPANY_ROOT_API)
    companyId = res.body[0]._id
    expect(res.statusCode).toBe(200)
    expect(res.body[0].name).toEqual(company.name)
  })

  test('Should get company by id', async () => {
    expect.assertions(2)
    const res = await agent.get(COMPANY_ID_API.replace(/:id/, companyId))
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toEqual(company.name)
  })

  test('Should not get company by id', async () => {
    expect.assertions(1)
    const res = await agent.get(
      COMPANY_ID_API.replace(/:id/, '59a25d39082e0f3954207953')
    )
    expect(res.statusCode).toBe(400)
  })

  test('Should modify a company', async () => {
    expect.assertions(2)
    const res = await agent
      .put(COMPANY_ID_API.replace(/:id/, companyId))
      .send(modifiedCompany)
    expect(res.statusCode).toBe(200)
    expect(res.body.addr).toEqual(modifiedCompany.addr)
  })

  test('Should not modify a company', async () => {
    expect.assertions(1)
    const res = await agent
      .put(COMPANY_ID_API.replace(/:id/, '59a25d39082e0f3954207953'))
      .send(modifiedCompany)
    expect(res.statusCode).toBe(400)
  })

  test('Should delete a company', async () => {
    expect.assertions(2)
    const res = await agent.delete(COMPANY_ID_API.replace(/:id/, companyId))
    expect(res.statusCode).toBe(200)
    expect(res.body.active).not.toBeTruthy()
  })

  test('Should not delete a company', async () => {
    expect.assertions(1)
    const res = await agent.delete(
      COMPANY_ID_API.replace(/:id/, '59a25d39082e0f3954207953')
    )
    expect(res.statusCode).toBe(400)
  })

  test('Should find some company according to query', async () => {
    expect.assertions(1)
    await agent.post(COMPANY_ROOT_API).send(company1)
    await agent.post(COMPANY_ROOT_API).send(company2)
    const res = await agent.get(COMPANY_QUERY_API).query(query)
    expect(res.body).toHaveLength(2)
  })
})
