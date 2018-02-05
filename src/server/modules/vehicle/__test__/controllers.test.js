import { Vehicle } from '../models'
import { User } from '../../user/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'
import { data } from '../../../utils/mockData'

describe('Vehicle Base Operations', () => {
  let vehicleId
  let fuelId
  let maintenanceId
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.drivers[0])
    await agent.post('/auth/register').send(data.drivers[1])
    await agent.post('/auth/register').send(data.managers[0])
  })

  afterAll(async () => {
    await User.remove()
    await Vehicle.remove()
  })

  test('Should create a vehicle', async () => {
    expect.assertions(1)
    const res = await agent.post(Api.VEHICLE_ROOT).send(data.vehicles[0])
    expect(res.statusCode).toBe(200)
  })

  test('Should not create a vehicle', async () => {
    expect.assertions(1)
    const res = await agent.post(Api.VEHICLE_ROOT).send(data.vehicles[0])
    expect(res.statusCode).toBe(400)
  })

  test('Should fetch vehicle by page_number = 1 and page_size = 2', async () => {
    expect.assertions(2)
    const res = await agent.get(`${Api.VEHICLE_ROOT}?page=1&size=2`)
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].plate).toBe(data.vehicles[0].plate)
  })

  test('Should fetch all vehicles', async () => {
    expect.assertions(3)
    await agent.post(Api.VEHICLE_ROOT).send(data.vehicles[1])
    const res = await agent.get(Api.VEHICLE_ALL)
    expect(res.statusCode).toBe(200)
    expect(res.body.result[1].plate).toEqual(data.vehicles[1].plate)
    expect(res.body.result).toHaveLength(2)
  })

  test('Should fetch a vehicle by id', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.VEHICLE_ALL)
    vehicleId = res1.body.result[0]._id
    fuelId = res1.body.result[0].fuels[0]._id
    maintenanceId = res1.body.result[0].maintenance[0]._id
    const res = await agent.get(Api.VEHICLE_ID.replace(/:id/, vehicleId))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.plate).toEqual(data.vehicles[0].plate)
  })

  test('Should update a vehicle by id', async () => {
    expect.assertions(2)
    const res = await agent
      .put(Api.VEHICLE_ID.replace(/:id/, vehicleId))
      .send({ model: '东风' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.model).toBe('东风')
  })

  test('Should fetch some fuel or maintain refs', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.VEHICLE_ALL)
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].fuels[0].litre).toBe(
      data.vehicles[0].fuels[0].litre
    )
  })

  test('Should add some fuel', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.VEHICLE_ID.replace(/:id/, vehicleId))
    let countOfFuels = res1.body.result.fuels.length
    const res = await agent
      .post(Api.VEHICLE_FUEL.replace(/:id/, vehicleId))
      .send([data.fuels[0], data.fuels[1]])
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels).toHaveLength(countOfFuels + 2)
  })

  test('Should add some maintenance', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.VEHICLE_ID.replace(/:id/, vehicleId))
    let countOfMaintain = res1.body.result.maintenance.length
    const res = await agent
      .post(Api.VEHICLE_MAINTAIN.replace(/:id/, vehicleId))
      .send([data.maintains[0], data.maintains[1]])
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance).toHaveLength(countOfMaintain + 2)
  })

  test('Should delete some fuels', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.VEHICLE_ID.replace(/:id/, vehicleId))
    let countOfFuels = res1.body.result.fuels.length
    const mapObj = {
      ':id': vehicleId,
      ':childId': fuelId
    }
    const res = await agent.delete(replaceAll(Api.VEHICLE_FUEL_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels).toHaveLength(countOfFuels - 1)
  })

  test('Should delete some maintenance', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.VEHICLE_ID.replace(/:id/, vehicleId))
    let countOfMaintain = res1.body.result.maintenance.length
    const mapObj = {
      ':id': vehicleId,
      ':childId': maintenanceId
    }
    const res = await agent.delete(replaceAll(Api.VEHICLE_MAINTAIN_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance).toHaveLength(countOfMaintain - 1)
  })

  test('Should delete a vehicle by id', async () => {
    expect.assertions(2)
    const res = await agent.delete(Api.VEHICLE_ID.replace(/:id/, vehicleId))
    expect(res.statusCode).toBe(200)
    expect(res.body.active).toBeFalsy()
  })
})
