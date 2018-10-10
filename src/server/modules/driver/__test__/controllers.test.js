import { User } from '../../user/models'
import { Vehicle } from '../../vehicle/models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import { Transport } from '../../transport/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'

import { data } from '../../../utils/mockData'

describe('Driver Base Operations', () => {
  let fuel0Id
  let maintain0Id
  let d0, d1, c0, v0, v1, cm0, cm1, p0, t0
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
    const t0Res = await agent.post('/api/transport').send({
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
    })
    t0 = t0Res.body.result[0]
    await agent.post('/api/transport').send({
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
    })
    await agent
      .post('/auth/login')
      .send({ username: d0.username, password: '123' })
  })

  afterAll(async () => {
    await User.remove()
    await Vehicle.remove()
    await Company.remove()
    await Product.remove()
    await Transport.remove()
  })

  test('Should fetch a driver by username', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.DRIVER_ID.replace(/:username/, d0.username))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fullname).toBe(d0.fullname)
  })

  test('Should not fetch a driver by username', async () => {
    expect.assertions(1)
    const res = await agent.get(Api.DRIVER_ID.replace(/:username/, d1.username))
    expect(res.statusCode).toBe(403)
  })

  test('Should change the password by username', async () => {
    expect.assertions(1)
    const res = await agent
      .put(Api.DRIVER_ID.replace(/:username/, d0.username))
      .send({ password: '12345' })
    expect(res.statusCode).toBe(200)
  })

  test('Should fetch a vehicle by username', async () => {
    expect.assertions(3)
    const res = await agent
      .get(Api.DRIVER_VEHICLE.replace(/:username/, d0.username))
      .query({
        page: 1,
        size: 2
      })
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
    expect(res.body.pagination.pageNumber).toBe(1)
  })

  test('Should add some fuels', async () => {
    expect.assertions(2)
    const values = [
      {
        ...data.fuels[0],
        applicant: d0.username,
        fullname: d0.fullname
      }
    ]
    const res = await agent
      .post(Api.DRIVER_FUEL.replace(/:username/, d0.username))
      .send({ vehicleId: v0._id, values: values })
    fuel0Id = res.body.result.fuels[0]._id
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels[0].litre).toBe(data.fuels[0].litre)
  })

  test('Should add some maintains', async () => {
    expect.assertions(2)
    const values = [
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
    const res = await agent
      .post(Api.DRIVER_MAINTAIN.replace(/:username/, d0.username))
      .send({ vehicleId: v0._id, values: values })
    maintain0Id = res.body.result.maintenance[0]._id
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance[0].reason).toBe(data.maintains[0].reason)
  })

  test('Should list fuels by username', async () => {
    expect.assertions(2)
    const res = await agent
      .get(Api.DRIVER_FUEL.replace(/:username/, d0.username))
      .query({ vehicleId: v0._id })
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(1)
  })

  test('Should list maintains by username', async () => {
    expect.assertions(2)
    const res = await agent
      .get(Api.DRIVER_MAINTAIN.replace(/:username/, d0.username))
      .query({ vehicleId: v0._id })
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
  })

  test('Should delete a fuel', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': d0.username,
      ':childId': fuel0Id
    }
    const res = await agent.delete(replaceAll(Api.DRIVER_FUEL_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels).toHaveLength(0)
  })

  test('Should delete a maintain', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': d0.username,
      ':childId': maintain0Id
    }
    const res = await agent.delete(replaceAll(Api.DRIVER_MAINTAIN_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance).toHaveLength(1)
  })

  test('Should get all transports by username', async () => {
    expect.assertions(2)
    const res = await agent.get(
      Api.DRIVER_TRANSPORT.replace(/:username/, d0.username)
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
  })

  test('Should update transport status to accept', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': d0.username,
      ':childId': t0._id
    }
    const res = await agent
      .put(replaceAll(Api.DRIVER_TRANSPORT_ID_STATUS, mapObj))
      .send({ status: 'accept' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].captainStatus).toBe('accept')
  })

  test('Should get accept transports by username', async () => {
    expect.assertions(2)
    const res = await agent
      .get(Api.DRIVER_TRANSPORT.replace(/:username/, d0.username))
      .query({ captainStatus: 'accept' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0]._id).toBe(t0._id)
  })

  test('Should update transport', async () => {
    expect.assertions(1)
    const mapObj = {
      ':username': d0.username,
      ':childId': t0._id
    }
    const res = await agent
      .put(replaceAll(Api.DRIVER_TRANSPORT_ID, mapObj))
      .send({
        'from.company': cm1._id,
        'from.name': cm1.name,
        'from.addr': cm1.addr
      })
    expect(res.statusCode).toBe(200)
  })

  test('Should get the image url', async () => {
    expect.assertions(1)
    const mapObj = {
      ':username': d0.username,
      ':childId': t0._id
    }
    const res = await agent
      .post(replaceAll(Api.DRIVER_TRANSPORT_UPLOAD_PIC, mapObj))
      .attach('shipping', data.images[0].license, 'driver.png')
    expect(res.statusCode).toBe(200)
  })
})
