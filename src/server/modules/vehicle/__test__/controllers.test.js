import { Vehicle } from '../models'
import { User } from '../../user/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'
import { data } from '../../../utils/mockData'

describe('Vehicle Base Operations', () => {
  let d0Id, d1Id, c0Id, v0Id, f0Id, m0Id
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.managers[0])
    const d0Res = await agent.post('/api/user').send(data.drivers[0])
    d0Id = d0Res.body.result.username
    const d1Res = await agent.post('/api/user').send(data.drivers[1])
    d1Id = d1Res.body.result.username
    const c0Res = await agent.post('/api/user').send(data.captains[0])
    c0Id = c0Res.body.result.username
  })

  afterAll(async () => {
    await User.remove()
    await Vehicle.remove()
  })

  test('Should create a vehicle', async () => {
    expect.assertions(1)
    const res = await agent.post(Api.VEHICLE_ROOT).send({
      ...data.vehicles[0],
      captain: c0Id,
      captainName: data.captains[0].fullname,
      principal: d0Id,
      principalName: data.drivers[0].fullname,
      secondary: d1Id,
      secondaryName: data.drivers[1].fullname
    })
    v0Id = res.body.result._id
    expect(res.statusCode).toBe(200)
  })

  test('Should not create a vehicle', async () => {
    expect.assertions(1)
    const res = await agent.post(Api.VEHICLE_ROOT).send({
      ...data.vehicles[0],
      captain: c0Id,
      captainName: data.captains[0].fullname,
      principal: d0Id,
      principalName: data.drivers[0].fullname,
      secondary: d1Id,
      secondaryName: data.drivers[1].fullname
    })
    expect(res.statusCode).toBe(400)
  })

  test('Should fetch vehicle by page_number = 1 and page_size = 2', async () => {
    expect.assertions(3)
    const res = await agent.get(`${Api.VEHICLE_ROOT}?page=1&size=2`)
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].plate).toBe(data.vehicles[0].plate)
    expect(res.body.pagination.pageNumber).toBe(1)
  })

  test('Should fetch all vehicles', async () => {
    expect.assertions(3)
    await agent.post(Api.VEHICLE_ROOT).send({
      ...data.vehicles[1],
      captain: c0Id,
      captainName: data.captains[0].fullname,
      principal: d0Id,
      principalName: data.drivers[0].fullname,
      secondary: d1Id,
      secondaryName: data.drivers[1].fullname
    })
    const res = await agent.get(Api.VEHICLE_ALL)
    expect(res.statusCode).toBe(200)
    expect(res.body.result[1].plate).toEqual(data.vehicles[1].plate)
    expect(res.body.result).toHaveLength(2)
  })

  test('Should fetch a vehicle by id', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.VEHICLE_ID.replace(/:id/, v0Id))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.plate).toEqual(data.vehicles[0].plate)
  })

  test('Should update a vehicle by id', async () => {
    expect.assertions(2)
    const res = await agent
      .put(Api.VEHICLE_ID.replace(/:id/, v0Id))
      .send({ model: '东风' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.model).toBe('东风')
  })

  test('Should add some fuel', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.VEHICLE_ID.replace(/:id/, v0Id))
    let countOfFuels = res1.body.result.fuels.length
    const res = await agent.post(Api.VEHICLE_FUEL.replace(/:id/, v0Id)).send([
      {
        ...data.fuels[0],
        applicant: d0Id,
        fullname: data.drivers[0].fullname
      },
      {
        ...data.fuels[1],
        applicant: d0Id,
        fullname: data.drivers[0].fullname
      }
    ])
    f0Id = res.body.result.fuels[0]._id
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels).toHaveLength(countOfFuels + 2)
  })

  test('Should add some maintenance', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.VEHICLE_ID.replace(/:id/, v0Id))
    let countOfMaintain = res1.body.result.maintenance.length
    const res = await agent
      .post(Api.VEHICLE_MAINTAIN.replace(/:id/, v0Id))
      .send([
        {
          ...data.maintains[0],
          applicant: d0Id,
          fullname: data.drivers[0].fullname
        },
        {
          ...data.maintains[1],
          applicant: d0Id,
          fullname: data.drivers[0].fullname
        }
      ])
    m0Id = res.body.result.maintenance[0]._id
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance).toHaveLength(countOfMaintain + 2)
  })

  test('Should fetch some fuel or maintain refs', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.VEHICLE_ID.replace(/:id/, v0Id))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels[0].litre).toBe(data.fuels[0].litre)
  })

  test('Should delete some fuels', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.VEHICLE_ID.replace(/:id/, v0Id))
    let countOfFuels = res1.body.result.fuels.length
    const mapObj = {
      ':id': v0Id,
      ':childId': f0Id
    }
    const res = await agent.delete(replaceAll(Api.VEHICLE_FUEL_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels).toHaveLength(countOfFuels - 1)
  })

  test('Should delete some maintenance', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.VEHICLE_ID.replace(/:id/, v0Id))
    let countOfMaintain = res1.body.result.maintenance.length
    const mapObj = {
      ':id': v0Id,
      ':childId': m0Id
    }
    const res = await agent.delete(replaceAll(Api.VEHICLE_MAINTAIN_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance).toHaveLength(countOfMaintain - 1)
  })

  test('Should delete a vehicle by id', async () => {
    expect.assertions(2)
    const res = await agent.delete(Api.VEHICLE_ID.replace(/:id/, v0Id))
    expect(res.statusCode).toBe(200)
    expect(res.body.active).toBeFalsy()
  })
})
