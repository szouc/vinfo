import { Transport } from '../models'
import { User } from '../../user/models'
import { Vehicle } from '../../vehicle/models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
// import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'
import { data } from '../../../utils/mockData'

describe('Transport Base Operations', () => {
  let num
  let transportId
  let d0, d1, c0, v0, v1, cm0, cm1, p0
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.managers[0])
    const d0Res = await agent.post('/api/user').send(data.drivers[0])
    d0 = d0Res.body.result
    const d1Res = await agent.post('/api/user').send(data.drivers[1])
    d1 = d1Res.body.result
    const c0Res = await agent.post('/api/user').send(data.captains[0])
    c0 = c0Res.body.result
    const v0Res = await agent.post('/api/vehicle').send({
      ...data.vehicles[0],
      captain: c0.username,
      captainName: c0.fullname,
      principal: d0.username,
      principalName: d0.fullname,
      secondary: d1.username,
      secondaryName: d1.fullname
    })
    v0 = v0Res.body.result
    const v1Res = await agent.post('/api/vehicle').send({
      ...data.vehicles[1],
      captain: c0.username,
      captainName: c0.fullname,
      principal: d0.username,
      principalName: d0.fullname,
      secondary: d1.username,
      secondaryName: d1.fullname
    })
    v1 = v1Res.body.result
    const cm0Res = await agent.post('/api/company').send(data.companies[0])
    cm0 = cm0Res.body.result
    const cm1Res = await agent.post('/api/company').send(data.companies[1])
    cm1 = cm1Res.body.result
    const p0Res = await agent.post('/api/product').send(data.products[0])
    p0 = p0Res.body.result
  })

  afterAll(async () => {
    await User.remove()
    await Product.remove()
    await Company.remove()
    await Vehicle.remove()
    await Transport.remove()
  })

  test('Should create a transport', async () => {
    expect.assertions(3)
    const res = await agent.post(Api.TRANSPORT_ROOT).send({
      assigner: c0.username,
      assignerName: c0.fullname,
      vehicle: v1._id,
      plate: v1.plate,
      engine: v1.engine,
      // principal: d0.username,
      // principalName: d0.fullname,
      // secondary: d1.username,
      // secondaryName: d1.fullname,
      from: {
        company: cm0._id,
        name: cm0.name,
        addr: cm0.addr
      },
      to: {
        company: cm1._id,
        name: cm1.name,
        addr: cm1.addr
      },
      product: p0._id,
      productName: p0.name,
      productSpecs: p0.specs
    })
    num = res.body.result[0].num
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].principalName).toBe(v0.principalName)
    expect(res.body.result[1].assigned).toBeTruthy()
  })

  test('Should create another transport', async () => {
    expect.assertions(2)
    const res = await agent.post(Api.TRANSPORT_ROOT).send({
      assigner: c0.username,
      assignerName: c0.fullname,
      vehicle: v0._id,
      plate: v0.plate,
      engine: v0.engine,
      // principal: d0.username,
      // principalName: d0.fullname,
      // secondary: d1.username,
      // secondaryName: d1.fullname,
      from: {
        company: cm0._id,
        name: cm0.name,
        addr: cm0.addr
      },
      to: {
        company: cm1._id,
        name: cm1.name,
        addr: cm1.addr
      },
      product: p0._id,
      productName: p0.name,
      productSpecs: p0.specs
    })
    const re = num + 1
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].num).toEqual(re)
  })

  test('Should fetch transport by page_number = 1 and page_size = 2', async () => {
    expect.assertions(3)
    const res = await agent.get(`${Api.TRANSPORT_ROOT}?page=1&size=2`)
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
    expect(res.body.pagination.pageNumber).toBe(1)
  })

  test('Should not create a transport', async () => {
    expect.assertions(2)
    const res = await agent.post(Api.TRANSPORT_ROOT).send({
      assigner: c0.username,
      assignerName: c0.fullname,
      vehicle: v0._id,
      plate: v0.plate,
      engine: v0.engine,
      // principal: d0.username,
      // principalName: d0.fullname,
      // secondary: d1.username,
      // secondaryName: d1.fullname,
      from: {
        company: cm0._id,
        name: cm0.name,
        addr: cm0.addr
      },
      to: {
        company: cm1._id,
        name: cm1.name,
        addr: cm1.addr
      },
      product: p0._id,
      productName: p0.name,
      productSpecs: p0.specs
    })
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toEqual('车辆不存在或已分配。')
  })

  test('Should fetch all transports', async () => {
    expect.assertions(1)
    const res = await agent.get(Api.TRANSPORT_ROOT)
    transportId = res.body.result[1]._id
    // transportId2 = res.body[0]._id
    expect(res.body.result).toHaveLength(2)
  })

  test('Should fetch a transport by id', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.TRANSPORT_ID.replace(/:id/, transportId))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.captainStatus).toEqual('assign')
  })

  test('Should change the transport status by id', async () => {
    expect.assertions(3)
    const res = await agent
      .put(Api.TRANSPORT_STATUS.replace(/:id/, transportId))
      .send({ captainStatus: 'accept' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].captainStatus).toBe('accept')
    expect(res.body.result[1].assigned).toBeFalsy()
  })

  test('Should update transport by id', async () => {
    expect.assertions(2)
    const res = await agent
      .put(Api.TRANSPORT_ID.replace(/:id/, transportId))
      .send({ principal: d1.username })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.principal).toBe(d1.username)
  })

  test('Should delete transport by id', async () => {
    expect.assertions(2)
    const res = await agent.delete(Api.TRANSPORT_ID.replace(/:id/, transportId))
    expect(res.statusCode).toBe(200)
    expect(res.body.result[1]).toBeFalsy()
    // expect(res.body.result).toBe(200)
  })
})
