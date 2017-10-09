import { User, Vehicle, Transport } from '../models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import {
  DRIVER_TRANSPORT_API,
  DRIVER_TRANSPORT_ID_API,
  DRIVER_MAINTAIN_API,
  DRIVER_MAINTAIN_ID_API,
  DRIVER_FUEL_API,
  DRIVER_FUEL_ID_API,
  DRIVER_ID_API
} from '../routes'

import { data } from '../../../utils/mockData'

let vehicle0Id
let fuel0Id
let maintain0Id
let transport
let transport0Id
let company0Id
let company1Id
let product0Id
describe('Driver Base Operations', () => {
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.drivers[0])
    await agent.post('/auth/register').send(data.drivers[1])
    await agent.post('/auth/register').send(data.captains[0])
    await agent.post('/auth/register').send(data.managers[0])
    const res = await agent.post('/api/vehicle').send(data.vehicles[0])
    vehicle0Id = res.body._id
    await agent.post('/api/vehicle').send(data.vehicles[1])
    await agent.post('/api/vehicle').send(data.vehicles[2])
    await agent
      .put(`/api/vehicle/${vehicle0Id}`)
      .send({
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
    company0Id = resCompany0.body._id
    const resCompany1 = await agent.post('/api/company').send(data.companies[1])
    company1Id = resCompany1.body._id
    const resProduct0 = await agent.post('/api/product').send(data.products[0])
    product0Id = resProduct0.body._id

    transport = { assigner: { username: data.captains[0].username, fullname: data.captains[0].fullname }, vehicle: { _id: vehicle0Id }, from: { company: { _id: company0Id } }, to: { company: { _id: company1Id } }, product: { _id: product0Id } }
    const resTransport = await agent.post('/api/transport').send(transport)
    transport0Id = resTransport.body[0]._id
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
    expect.assertions(1)
    const res = await agent.get(DRIVER_ID_API.replace(/:username/, data.drivers[2].username))
    expect(res.statusCode).toBe(200)
  })

  test('Should not fetch a driver by username', async () => {
    expect.assertions(1)
    const res = await agent.get(DRIVER_ID_API.replace(/:username/, data.drivers[0].username))
    expect(res.statusCode).toBe(403)
  })

  test('Should change the password by username', async () => {
    expect.assertions(1)
    const res = await agent
      .put(DRIVER_ID_API.replace(/:username/, data.drivers[2].username))
      .send({ password: '12345' })
    expect(res.statusCode).toBe(200)
  })

  test('Should add some fuels', async () => {
    expect.assertions(1)
    const values = [{ ...data.fuels[1], applicant: { username: data.drivers[2].username, fullname: data.drivers[2].fullname } }]
    const res = await agent
      .post(DRIVER_FUEL_API.replace(/:username/, data.drivers[2].username))
      .send({ vehicleId: vehicle0Id, values: values })
    fuel0Id = res.body.fuels[0]._id
    expect(res.body.fuels[0].litre).toBe(data.fuels[1].litre)
  })

  test('Should add some maintains', async () => {
    expect.assertions(1)
    const values = [{ ...data.maintains[1], applicant: { username: data.drivers[2].username, fullname: data.drivers[2].fullname } }]
    const res = await agent
      .post(DRIVER_MAINTAIN_API.replace(/:username/, data.drivers[2].username))
      .send({ vehicleId: vehicle0Id, values: values })
    maintain0Id = res.body.maintenance[0]._id
    expect(res.body.maintenance[0].reason).toBe(data.maintains[1].reason)
  })

  test('Should list fuels by username', async () => {
    expect.assertions(2)
    const res = await agent.get(DRIVER_FUEL_API.replace(/:username/, data.drivers[2].username))
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
  })

  test('Should list maintains by username', async () => {
    expect.assertions(1)
    const res = await agent.get(DRIVER_MAINTAIN_API.replace(/:username/, data.drivers[2].username))
    expect(res.statusCode).toBe(200)
  })

  test('Should delete a fuel', async () => {
    expect.assertions(2)
    const mapObj = { ':username': data.drivers[2].username, ':childId': fuel0Id }
    const res = await agent.delete(replaceAll(DRIVER_FUEL_ID_API, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.fuels).toHaveLength(0)
  })

  test('Should delete a maintain', async () => {
    expect.assertions(2)
    const mapObj = { ':username': data.drivers[2].username, ':childId': maintain0Id }
    const res = await agent.delete(replaceAll(DRIVER_MAINTAIN_ID_API, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.maintenance).toHaveLength(0)
  })

  test('Should get all transports by username', async () => {
    expect.assertions(1)
    const res = await agent.get(DRIVER_TRANSPORT_API.replace(/:username/, data.drivers[2].username))
    expect(res.statusCode).toBe(200)
  })

  test('Should update transport status', async () => {
    expect.assertions(1)
    const mapObj = {
      ':username': data.drivers[2].username,
      ':childId': transport0Id
    }
    const res = await agent.put(replaceAll(DRIVER_TRANSPORT_ID_API, mapObj)).send({captain_status: 'accept'})
    expect(res.statusCode).toBe(200)
  })
})
