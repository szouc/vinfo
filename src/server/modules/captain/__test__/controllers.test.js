import { User, Vehicle, Transport } from '../models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'

import { data } from '../../../utils/mockData'

describe('Captain Base Operations', () => {
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.drivers[0])
    await agent.post('/auth/register').send(data.drivers[1])
    await agent.post('/auth/register').send(data.drivers[2])
    await agent.post('/auth/register').send(data.captains[0])
    await agent.post('/auth/register').send(data.captains[1])
    await agent.post('/auth/register').send(data.managers[0])
    await agent.post('/api/company').send(data.companies[0])
    await agent.post('/api/company').send(data.companies[1])
    await agent.post('/api/product').send(data.products[0])
    data.vehicles[0].captain = data.captains[0]
    data.vehicles[1].captain = data.captains[0]
    await agent.post('/api/vehicle').send(data.vehicles[0])
    await agent.post('/api/vehicle').send(data.vehicles[1])
    await agent.post('/api/vehicle').send(data.vehicles[2])
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
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
  })

  test('Should update a fuel by id', async () => {
    expect.assertions(2)
    console.log(data.vehicles[0])
    const mapObj = {
      ':username': data.captains[0].username,
      ':childId': data.vehicles[0].fuels[0]._id
    }
    const res = await agent.put(replaceAll(Api.CAPTAIN_FUEL_ID, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels[0].is_check).toBeTruthy()
  })

  test('Should update a maintain by id', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.captains[0].username,
      ':childId': maintain0Id
    }
    const res = await agent
      .put(replaceAll(Api.CAPTAIN_MAINTAIN_ID, mapObj))
      .send({
        is_check: true
      })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance[0].is_check).toBeTruthy()
  })

  test('Should create a transport', async () => {
    expect.assertions(1)
    const res = await agent
      .post(
        Api.CAPTAIN_TRANSPORT.replace(/:username/, data.captains[0].username)
      )
      .send(data.transports[0])
    // transport0Id = res.body.result[0]._id
    expect(res).toBe(200)
  })

  test('Should get all transports', async () => {
    expect.assertions(3)
    await agent
      .post(
        Api.CAPTAIN_TRANSPORT.replace(/:username/, data.captains[0].username)
      )
      .send(transport1)
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
    expect(res.body.result.captain_status).toEqual('pass')
  })
})
