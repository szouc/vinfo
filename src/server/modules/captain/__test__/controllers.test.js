import { User, Vehicle, Transport } from '../models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'

import { data } from '../../../utils/mockData'

describe('Captain Base Operations', () => {
  let vehicle1
  let vehicle2
  let transport0Id
  let captain0
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.managers[0])
    const res1 = await agent.post('/api/user').send(data.captains[0])
    captain0 = res1.body.result
    await agent.post('/api/user').send(data.captains[1])
    data.vehicles[0].captain = captain0
    data.vehicles[1].captain = captain0
    await agent.post('/api/vehicle').send(data.vehicles[0])
    const res = await agent.post('/api/vehicle').send(data.vehicles[1])
    vehicle1 = res.body.result
    const res2 = await agent.post('/api/vehicle').send(data.vehicles[2])
    vehicle2 = res2.body.result
    await agent.post('/auth/login').send(data.captains[0])
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
      Api.CAPTAIN_ID.replace(/:username/, data.captains[0].username)
    )
    expect(res.statusCode).toBe(200)
  })

  test('Should not fetch a captain by username', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.CAPTAIN_ID.replace(/:username/, data.captains[1].username)
    )
    expect(res.statusCode).toBe(403)
  })

  test('Should change the password by username', async () => {
    expect.assertions(1)
    const res = await agent
      .put(Api.CAPTAIN_ID.replace(/:username/, data.captains[0].username))
      .send({
        password: '12345'
      })
    expect(res.statusCode).toBe(200)
  })

  test('Should get all vehicle by username', async () => {
    expect.assertions(2)
    const res = await agent.get(
      `${Api.CAPTAIN_VEHICLE.replace(
        /:username/,
        data.captains[0].username
      )}?page=1&size=20`
    )
    expect(res.status).toBe(200)
    expect(res.body.result).toHaveLength(2)
  })

  test('Should update a fuel by id', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.captains[0].username,
      ':childId': data.vehicles[0].fuels[0]._id
    }
    const res = await agent.put(replaceAll(Api.CAPTAIN_FUEL_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels[0].isCheck).toBeTruthy()
  })

  test('Should update a maintain by id', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.captains[0].username,
      ':childId': data.vehicles[0].maintenance[0]._id
    }
    const res = await agent.put(replaceAll(Api.CAPTAIN_MAINTAIN_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance[0].isCheck).toBeTruthy()
  })

  test('Should create a transport', async () => {
    expect.assertions(1)
    data.transports[0].assigner = captain0
    data.transports[0].vehicle = vehicle1
    const res = await agent
      .post(
        Api.CAPTAIN_TRANSPORT.replace(/:username/, data.captains[0].username)
      )
      .send(data.transports[0])
    transport0Id = res.body.result[0]._id
    expect(res.statusCode).toBe(200)
  })

  test('Should get all transports', async () => {
    expect.assertions(3)
    data.transports[1].assigner = captain0
    data.transports[1].vehicle = vehicle2
    await agent
      .post(
        Api.CAPTAIN_TRANSPORT.replace(/:username/, data.captains[0].username)
      )
      .send(data.transports[1])
    const res = await agent.get(
      Api.CAPTAIN_TRANSPORT.replace(/:username/, data.captains[0].username)
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
    const transportArray = res.body.result.map(item => item._id)
    expect(transportArray).toContain(transport0Id)
  })

  test('Should update a transport status', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.captains[0].username,
      ':childId': transport0Id
    }
    const res = await agent
      .put(replaceAll(Api.CAPTAIN_TRANSPORT_ID, mapObj))
      .send({ status: 'pass' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.captainStatus).toEqual('pass')
  })
})
