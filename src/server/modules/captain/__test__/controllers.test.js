import { User, Vehicle, Transport } from '../models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import {
  // CAPTAIN_MAINTAIN,
  CAPTAIN_TRANSPORT,
  CAPTAIN_TRANSPORT_ID,
  CAPTAIN_MAINTAIN_ID,
  // CAPTAIN_FUEL,
  CAPTAIN_FUEL_ID,
  CAPTAIN_VEHICLE,
  CAPTAIN_ID
} from '../api'

import { data } from '../../../utils/mockData'

describe('Captain Base Operations', () => {
  let vehicle0Id
  let vehicle1Id
  let company0Id
  let company1Id
  let product0Id
  let fuel0Id
  let maintain0Id
  let transport
  let transport1
  let transport0Id
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.drivers[0])
    await agent.post('/auth/register').send(data.drivers[1])
    await agent.post('/auth/register').send(data.drivers[2])
    await agent.post('/auth/register').send(data.captains[0])
    await agent.post('/auth/register').send(data.managers[0])
    const resCompany0 = await agent.post('/api/company').send(data.companies[0])
    company0Id = resCompany0.body.result._id
    const resCompany1 = await agent.post('/api/company').send(data.companies[1])
    company1Id = resCompany1.body.result._id
    const resProduct0 = await agent.post('/api/product').send(data.products[0])
    product0Id = resProduct0.body.result._id
    const resVehicle0 = await agent.post('/api/vehicle').send(data.vehicles[0])
    vehicle0Id = resVehicle0.body.result._id
    const resVehicle1 = await agent.post('/api/vehicle').send(data.vehicles[1])
    vehicle1Id = resVehicle1.body.result._id
    await agent.post('/api/vehicle').send(data.vehicles[2])
    await agent.put(`/api/vehicle/${vehicle0Id}`).send({
      captain: {
        username: data.captains[0].username,
        fullname: data.captains[0].fullname
      },
      principal: {
        username: data.drivers[0].username,
        fullname: data.drivers[0].fullname
      },
      secondary: {
        username: data.drivers[1].username,
        fullname: data.drivers[1].fullname
      }
    })
    await agent.put(`/api/vehicle/${vehicle1Id}`).send({
      captain: {
        username: data.captains[0].username,
        fullname: data.captains[0].fullname
      },
      principal: {
        username: data.drivers[0].username,
        fullname: data.drivers[0].fullname
      },
      secondary: {
        username: data.drivers[1].username,
        fullname: data.drivers[1].fullname
      }
    })
    const fuelValues = [
      {
        ...data.fuels[1],
        applicant: {
          username: data.drivers[2].username,
          fullname: data.drivers[2].fullname
        }
      },
      {
        ...data.fuels[2],
        applicant: {
          username: data.drivers[2].username,
          fullname: data.drivers[2].fullname
        }
      }
    ]
    const resFuel = await agent
      .post(`/api/vehicle/${vehicle0Id}/fuel`)
      .send(fuelValues)
    fuel0Id = resFuel.body.result.fuels[0]._id
    const maintainValues = [
      {
        ...data.maintains[1],
        applicant: {
          username: data.drivers[2].username,
          fullname: data.drivers[2].fullname
        }
      },
      {
        ...data.maintains[2],
        applicant: {
          username: data.drivers[2].username,
          fullname: data.drivers[2].fullname
        }
      }
    ]
    const resMaintain = await agent
      .post(`/api/vehicle/${vehicle0Id}/maintenance`)
      .send(maintainValues)
    maintain0Id = resMaintain.body.result.maintenance[0]._id
    await agent.post('/auth/login').send(data.captains[0])
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
    transport1 = {
      assigner: {
        username: data.captains[0].username,
        fullname: data.captains[0].fullname
      },
      vehicle: { _id: vehicle1Id },
      from: { company: { _id: company0Id } },
      to: { company: { _id: company1Id } },
      product: { _id: product0Id }
    }
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
      CAPTAIN_ID.replace(/:username/, data.captains[0].username)
    )
    expect(res.statusCode).toBe(200)
  })

  test('Should not fetch a captain by username', async () => {
    expect.assertions(1)
    const res = await agent.get(
      CAPTAIN_ID.replace(/:username/, data.captains[1].username)
    )
    expect(res.statusCode).toBe(403)
  })

  test('Should change the password by username', async () => {
    expect.assertions(1)
    const res = await agent
      .put(CAPTAIN_ID.replace(/:username/, data.captains[0].username))
      .send({
        password: '12345'
      })
    expect(res.statusCode).toBe(200)
  })

  test('Should get all vehicle by username', async () => {
    expect.assertions(3)
    const res = await agent.get(
      `${CAPTAIN_VEHICLE.replace(/:username/, data.captains[0].username)}?page=1&size=20`
    )
    // expect(res.body).toBe(maintain0Id)
    expect(res.body.result).toHaveLength(2)
    const fuelArray = res.body.result.reduce(
      (re, item) => ([...re.fuels, ...item.fuels])
    ).map(item => item._id)
    const maintainArray = res.body.result.reduce(
      (re, item) => ([...re.maintenance, ...item.maintenance])
    ).map(item => item._id)

    expect(fuelArray).toContain(fuel0Id)
    expect(maintainArray).toContain(maintain0Id)
    // expect(res.body.result[0].fuels[0]._id).toContain(fuel0Id)
    // expect(res.body.result[0].maintenance[0]._id).toBe(maintain0Id)
  })

  test('Should update a fuel by id', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.captains[0].username,
      ':childId': fuel0Id
    }
    const res = await agent.put(replaceAll(CAPTAIN_FUEL_ID, mapObj)).send({
      is_check: true
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.fuels[0].is_check).toBeTruthy()
  })

  test('Should update a maintain by id', async () => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.captains[0].username,
      ':childId': maintain0Id
    }
    const res = await agent.put(replaceAll(CAPTAIN_MAINTAIN_ID, mapObj)).send({
      is_check: true
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.maintenance[0].is_check).toBeTruthy()
  })

  test('Should create a transport', async () => {
    expect.assertions(1)
    const res = await agent
      .post(CAPTAIN_TRANSPORT.replace(/:username/, data.captains[0].username))
      .send(transport)
    transport0Id = res.body.result[0]._id
    expect(res.statusCode).toBe(200)
  })

  test('Should get all transports', async () => {
    expect.assertions(3)
    await agent
      .post(CAPTAIN_TRANSPORT.replace(/:username/, data.captains[0].username))
      .send(transport1)
    const res = await agent.get(
      CAPTAIN_TRANSPORT.replace(/:username/, data.captains[0].username)
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
      .put(replaceAll(CAPTAIN_TRANSPORT_ID, mapObj))
      .send({ status: 'pass' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result.captain_status).toEqual('pass')
  })
})
