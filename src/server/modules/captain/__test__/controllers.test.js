import { User, Vehicle, Transport } from '../models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'

import { data } from '../../../utils/mockData'

describe('Captain Base Operations', () => {
  let fuel0Id
  let maintain0Id
  let d0, d1, c0, c1, v0, v1, cm0, cm1, p0, t0, t0Res, t1Res
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.managers[0])
    const d0Res = await agent.post('/api/user').send(data.drivers[0])
    d0 = d0Res.body.result
    const d1Res = await agent.post('/api/user').send(data.drivers[1])
    d1 = d1Res.body.result
    const c0Res = await agent.post('/api/user').send(data.captains[0])
    c0 = c0Res.body.result
    const c1Res = await agent.post('/api/user').send(data.captains[1])
    c1 = c1Res.body.result
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
    await agent
      .post('/auth/login')
      .send({ username: d0.username, password: '123' })
    const values = [
      {
        ...data.fuels[0],
        applicant: d0.username,
        fullname: d0.fullname
      }
    ]
    const f0res = await agent
      .post('/api/driver/:username/fuel'.replace(/:username/, d0.username))
      .send({ vehicleId: v0._id, values: values })
    fuel0Id = f0res.body.result.fuels[0]._id
    const value1 = [
      {
        ...data.maintains[0],
        applicant: d0.username,
        fullname: d0.fullname
      },
      {
        ...data.maintains[1],
        applicant: d0.username,
        fullname: d0.fullname
      }
    ]
    const m0res = await agent
      .post(
        '/api/driver/:username/maintenance'.replace(/:username/, d0.username)
      )
      .send({ vehicleId: v0._id, values: value1 })
    maintain0Id = m0res.body.result.maintenance[0]._id
    t0Res = {
      assigner: c0.username,
      assignerName: c0.fullname,
      vehicle: v1._id,
      plate: v1.plate,
      engine: v1.engine,
      fromCompany: cm0._id,
      fromName: cm0.name,
      fromAddr: cm0.addr,
      toCompany: cm1._id,
      toName: cm1.name,
      toAddr: cm1.addr,
      product: p0._id,
      productName: p0.name,
      productSpecs: p0.specs
    }
    t1Res = {
      assigner: c0.username,
      assignerName: c0.fullname,
      vehicle: v0._id,
      plate: v0.plate,
      engine: v0.engine,
      fromCompany: cm0._id,
      fromName: cm0.name,
      fromAddr: cm0.addr,
      toCompany: cm1._id,
      toName: cm1.name,
      toAddr: cm1.addr,
      product: p0._id,
      productName: p0.name,
      productSpecs: p0.specs
    }
    await agent
      .post('/auth/login')
      .send({ username: c0.username, password: '123' })
  })

  afterAll(async () => {
    await User.remove()
    await Vehicle.remove()
    await Company.remove()
    await Product.remove()
    await Transport.remove()
  })

  test('Should fetch a captain by username', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.CAPTAIN_ID.replace(/:username/, c0.username)
    )
    expect(res.statusCode).toBe(200)
  })

  test('Should fetch companies', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.CAPTAIN_COMPANY.replace(/:username/, c0.username)
    )
    expect(res.statusCode).toBe(200)
  })

  test('Should fetch products', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.CAPTAIN_PRODUCT.replace(/:username/, c0.username)
    )
    expect(res.statusCode).toBe(200)
  })

  test('Should not fetch a captain by username', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.CAPTAIN_ID.replace(/:username/, c1.username)
    )
    expect(res.statusCode).toBe(403)
  })

  test('Should change the password by username', async () => {
    expect.assertions(1)
    const res = await agent
      .put(Api.CAPTAIN_ID.replace(/:username/, c0.username))
      .send({
        password: '12345'
      })
    expect(res.statusCode).toBe(200)
  })

  test('Should get all vehicle by username', async () => {
    expect.assertions(2)
    const res = await agent.get(
      `${Api.CAPTAIN_VEHICLE.replace(/:username/, c0.username)}?page=1&size=20`
    )
    expect(res.status).toBe(200)
    expect(res.body.result).toHaveLength(2)
  })

  test('Should update a fuel by id', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': c0.username,
      ':childId': fuel0Id
    }
    const res = await agent.put(replaceAll(Api.CAPTAIN_FUEL_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels[0].isCheck).toBeTruthy()
  })

  test('Should update a maintain by id', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': c0.username,
      ':childId': maintain0Id
    }
    const res = await agent.put(replaceAll(Api.CAPTAIN_MAINTAIN_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance[0].isCheck).toBeTruthy()
  })

  test('Should create a transport', async () => {
    expect.assertions(1)
    const res = await agent
      .post(Api.CAPTAIN_TRANSPORT.replace(/:username/, c0.username))
      .send(t0Res)
    t0 = res.body.result[0]
    expect(res.statusCode).toBe(200)
  })

  test('Should get all transports', async () => {
    expect.assertions(3)
    await agent
      .post(Api.CAPTAIN_TRANSPORT.replace(/:username/, c0.username))
      .send(t1Res)
    const res = await agent.get(
      Api.CAPTAIN_TRANSPORT.replace(/:username/, c0.username)
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
    const transportArray = res.body.result.map(item => item._id)
    expect(transportArray).toContain(t0._id)
  })

  test('Should not update a transport status', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': c0.username,
      ':childId': t0._id
    }
    const res = await agent
      .put(replaceAll(Api.CAPTAIN_TRANSPORT_ID, mapObj))
      .send({ status: 'pass' })
    expect(res.statusCode).toBe(200)
    expect(res.body.ok).not.toBeTruthy()
  })
})
