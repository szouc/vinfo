import { User, Vehicle, Transport } from '../models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'

import { data } from '../../../utils/mockData'

describe('Driver Base Operations', () => {
  let vehicle0
  let vehicle1
  let driver2
  let fuel0Id
  let maintain0Id
  let transport0
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.managers[0])
    await agent.post('/api/user').send(data.drivers[0])
    await agent.post('/api/user').send(data.drivers[1])
    const res1 = await agent.post('/api/user').send(data.drivers[2])
    driver2 = res1.body.result
    await agent.post('/api/user').send(data.captains[0])
    data.vehicles[0].principal = driver2
    const res = await agent.post('/api/vehicle').send(data.vehicles[0])
    vehicle0 = res.body.result
    const res3 = await agent.post('/api/vehicle').send(data.vehicles[1])
    vehicle1 = res3.body.result
    await agent.post('/api/vehicle').send(data.vehicles[2])
    data.transports[0].principal = driver2
    data.transports[0].vehicle = vehicle0
    data.transports[1].principal = driver2
    data.transports[1].vehicle = vehicle1
    await agent.post('/api/transport').send(data.transports[0])
    await agent.post('/api/transport').send(data.transports[1])
    await agent.post('/auth/login').send(data.drivers[2])
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
    expect.assertions(3)
    const res = await agent.get(
      `${Api.DRIVER_VEHICLE.replace(
        /:username/,
        data.drivers[2].username
      )}?page=1&size=2`
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0]._id).toBe(vehicle0._id)
    expect(res.body.pagination.pageNumber).toBe(1)
  })

  test('Should add some fuels', async () => {
    expect.assertions(2)
    const values = [
      {
        ...data.fuels[1],
        applicant: driver2
      }
    ]
    const res = await agent
      .post(Api.DRIVER_FUEL.replace(/:username/, data.drivers[2].username))
      .send({ vehicleId: vehicle0._id, values: values })
    let fuelArray = res.body.result.fuels
    let fuel = fuelArray.filter(
      item => item.applicant.username === data.drivers[2].username
    )
    fuel0Id = fuel[0]._id
    expect(res.statusCode).toBe(200)
    expect(fuel[0].litre).toBe(data.fuels[1].litre)
  })

  test('Should add some maintains', async () => {
    expect.assertions(2)
    const values = [
      {
        ...data.maintains[1],
        applicant: driver2
      },
      {
        ...data.maintains[2],
        applicant: driver2
      }
    ]
    const res = await agent
      .post(Api.DRIVER_MAINTAIN.replace(/:username/, data.drivers[2].username))
      .send({ vehicleId: vehicle0._id, values: values })
    let maintainArray = res.body.result.maintenance
    let maintain = maintainArray.filter(
      item => item.applicant.username === data.drivers[2].username
    )
    maintain0Id = maintain[0]._id
    expect(res.statusCode).toBe(200)
    expect(maintain[0].reason).toBe(data.maintains[1].reason)
  })

  test('Should list fuels by username', async () => {
    expect.assertions(2)
    const res = await agent.get(
      `${Api.DRIVER_FUEL.replace(
        /:username/,
        data.drivers[2].username
      )}?vehicleId=${vehicle0._id}`
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(1)
  })

  test('Should list maintains by username', async () => {
    expect.assertions(2)
    const res = await agent.get(
      `${Api.DRIVER_MAINTAIN.replace(
        /:username/,
        data.drivers[2].username
      )}?vehicleId=${vehicle0._id}`
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
  })

  test('Should delete a fuel', async () => {
    expect.assertions(1)
    const mapObj = {
      ':username': data.drivers[2].username,
      ':childId': fuel0Id
    }
    const res = await agent.delete(replaceAll(Api.DRIVER_FUEL_ID, mapObj))
    expect(res.statusCode).toBe(200)
    // expect(res.body.result.fuels).toHaveLength(0)
  })

  test('Should delete a maintain', async () => {
    expect.assertions(1)
    const mapObj = {
      ':username': data.drivers[2].username,
      ':childId': maintain0Id
    }
    const res = await agent.delete(replaceAll(Api.DRIVER_MAINTAIN_ID, mapObj))
    expect(res.statusCode).toBe(200)
    // expect(res.body.result.maintenance).toHaveLength(0)
  })

  test('Should get all transports by username', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.DRIVER_TRANSPORT.replace(/:username/, data.drivers[2].username)
    )
    transport0 = res.body.result[0]
    expect(res.statusCode).toBe(200)
  })

  test('Should update transport status', async () => {
    expect.assertions(1)
    const mapObj = {
      ':username': data.drivers[2].username,
      ':childId': transport0._id
    }
    const res = await agent
      .put(replaceAll(Api.DRIVER_TRANSPORT_ID, mapObj))
      .send({ status: 'accept' })
    expect(res.statusCode).toBe(200)
  })
})
