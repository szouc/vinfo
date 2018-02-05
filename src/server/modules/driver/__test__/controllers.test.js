import { User, Vehicle, Transport } from '../models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'

import { data } from '../../../utils/mockData'

describe('Driver Base Operations', () => {
  let vehicle0Id
  let fuel0Id
  let maintain0Id
  let transport
  let transport0Id
  let company0Id
  let company1Id
  let product0Id
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.drivers[0])
    await agent.post('/auth/register').send(data.drivers[1])
    await agent.post('/auth/register').send(data.captains[0])
    await agent.post('/auth/register').send(data.managers[0])
    const res = await agent.post('/api/vehicle').send(data.vehicles[0])
    vehicle0Id = res.body.result._id
    await agent.post('/api/vehicle').send(data.vehicles[1])
    await agent.post('/api/vehicle').send(data.vehicles[2])
    await agent.put(`/api/vehicle/${vehicle0Id}`).send({
      principal: {
        username: data.drivers[2].username,
        fullname: data.drivers[2].fullname
      },
      secondary: {
        username: data.drivers[1].username,
        fullname: data.drivers[1].fullname
      }
    })
    const resCompany0 = await agent.post('/api/company').send(data.companies[0])
    company0Id = resCompany0.body.result._id
    const resCompany1 = await agent.post('/api/company').send(data.companies[1])
    company1Id = resCompany1.body.result._id
    const resProduct0 = await agent.post('/api/product').send(data.products[0])
    product0Id = resProduct0.body.result._id

    transport = {
      assigner: {
        username: data.captains[0].username,
        fullname: data.captains[0].fullname
      },
      vehicle: { _id: vehicle0Id },
      from: { company: { _id: company0Id } },
      to: { company: { _id: company1Id } },
      product: { _id: product0Id }
    }
    const resTransport = await agent.post('/api/transport').send(transport)
    transport0Id = resTransport.body.result[0]._id
    await agent.post('/auth/register').send(data.drivers[2])
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
    const res = await agent.get(
      Api.DRIVER_ID.replace(/:username/, data.drivers[2].username)
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result.username).toBe(data.drivers[2].username)
  })

  test('Should not fetch a driver by username', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.DRIVER_ID.replace(/:username/, data.drivers[0].username)
    )
    expect(res.statusCode).toBe(403)
  })

  test('Should change the password by username', async () => {
    expect.assertions(1)
    const res = await agent
      .put(Api.DRIVER_ID.replace(/:username/, data.drivers[2].username))
      .send({ password: '12345' })
    expect(res.statusCode).toBe(200)
  })

  test('Should fetch a vehicle by username', async () => {
    expect.assertions(2)
    const res = await agent.get(
      Api.DRIVER_VEHICLE.replace(/:username/, data.drivers[2].username)
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result._id).toBe(vehicle0Id)
  })

  test('Should add some fuels', async () => {
    expect.assertions(1)
    const values = [
      {
        ...data.fuels[1],
        applicant: {
          username: data.drivers[2].username,
          fullname: data.drivers[2].fullname
        }
      }
    ]
    const res = await agent
      .post(Api.DRIVER_FUEL.replace(/:username/, data.drivers[2].username))
      .send({ vehicleId: vehicle0Id, values: values })
    fuel0Id = res.body.result.fuels[0]._id
    expect(res.body.fuels[0].litre).toBe(data.fuels[1].litre)
  })

  test('Should add some maintains', async () => {
    expect.assertions(1)
    const values = [
      {
        ...data.maintains[1],
        applicant: {
          username: data.drivers[2].username,
          fullname: data.drivers[2].fullname
        }
      }
    ]
    const res = await agent
      .post(Api.DRIVER_MAINTAIN.replace(/:username/, data.drivers[2].username))
      .send({ vehicleId: vehicle0Id, values: values })
    maintain0Id = res.body.result.maintenance[0]._id
    expect(res.body.maintenance[0].reason).toBe(data.maintains[1].reason)
  })

  test('Should list fuels by username', async () => {
    expect.assertions(2)
    const res = await agent.get(
      Api.DRIVER_FUEL.replace(/:username/, data.drivers[2].username)
    )
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
  })

  test('Should list maintains by username', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.DRIVER_MAINTAIN.replace(/:username/, data.drivers[2].username)
    )
    expect(res.statusCode).toBe(200)
  })

  test('Should delete a fuel', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.drivers[2].username,
      ':childId': fuel0Id
    }
    const res = await agent.delete(replaceAll(Api.DRIVER_FUEL_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.fuels).toHaveLength(0)
  })

  test('Should delete a maintain', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.drivers[2].username,
      ':childId': maintain0Id
    }
    const res = await agent.delete(replaceAll(Api.DRIVER_MAINTAIN_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.maintenance).toHaveLength(0)
  })

  test('Should get all transports by username', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.DRIVER_TRANSPORT.replace(/:username/, data.drivers[2].username)
    )
    expect(res.statusCode).toBe(200)
  })

  test('Should update transport status', async () => {
    expect.assertions(1)
    const mapObj = {
      ':username': data.drivers[2].username,
      ':childId': transport0Id
    }
    const res = await agent
      .put(replaceAll(Api.DRIVER_TRANSPORT_ID, mapObj))
      .send({ captain_status: 'accept' })
    expect(res.statusCode).toBe(200)
  })
})
