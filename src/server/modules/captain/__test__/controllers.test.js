import {
  User,
  Vehicle,
  Transport
} from '../models'
import app from '../../../app'
import request from 'supertest'
import {
  replaceAll
} from '../../../utils/replaceAll'
import {
  // CAPTAIN_MAINTAIN_API,
  CAPTAIN_TRANSPORT_API,
  // CAPTAIN_TRANSPORT_ID_API,
  CAPTAIN_MAINTAIN_ID_API,
  // CAPTAIN_FUEL_API,
  CAPTAIN_FUEL_ID_API,
  CAPTAIN_VEHICLE_API,
  CAPTAIN_ID_API
} from '../routes'

import {
  data
} from '../../../utils/mockData'

let vehicle0Id
let company0Id
let company1Id
let product0Id
let fuel0Id
let maintain0Id
let transport
describe('Captain Base Operations', () => {
  const agent = request.agent(app)
  beforeAll(async() => {
    await agent.post('/auth/register').send(data.drivers[0])
    await agent.post('/auth/register').send(data.drivers[1])
    await agent.post('/auth/register').send(data.drivers[2])
    await agent.post('/auth/register').send(data.captains[0])
    await agent.post('/auth/register').send(data.managers[0])
    const resCompany0 = await agent.post('/api/company').send(data.companies[0])
    company0Id = resCompany0.body._id
    const resCompany1 = await agent.post('/api/company').send(data.companies[1])
    company1Id = resCompany1.body._id
    const resProduct0 = await agent.post('/api/product').send(data.products[0])
    product0Id = resProduct0.body._id
    const res = await agent.post('/api/vehicle').send(data.vehicles[0])
    vehicle0Id = res.body._id
    await agent.post('/api/vehicle').send(data.vehicles[1])
    await agent.post('/api/vehicle').send(data.vehicles[2])
    await agent
      .put(`/api/vehicle/${vehicle0Id}`)
      .send({
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
    const fuelValues = [{ ...data.fuels[1],
      applicant: {
        username: data.drivers[2].username,
        fullname: data.drivers[2].fullname
      }
    }, { ...data.fuels[2],
      applicant: {
        username: data.drivers[2].username,
        fullname: data.drivers[2].fullname
      }
    }]
    const resFuel = await agent
      .post(`/api/vehicle/${vehicle0Id}/fuel`)
      .send(fuelValues)
    fuel0Id = resFuel.body.fuels[0]._id
    const maintainValues = [{ ...data.maintains[1],
      applicant: {
        username: data.drivers[2].username,
        fullname: data.drivers[2].fullname
      }
    }, { ...data.maintains[2],
      applicant: {
        username: data.drivers[2].username,
        fullname: data.drivers[2].fullname
      }
    }]
    const resMaintain = await agent
      .post(`/api/vehicle/${vehicle0Id}/maintenance`)
      .send(maintainValues)
    maintain0Id = resMaintain.body.maintenance[0]._id
    await agent.post('/auth/login').send(data.captains[0])
    transport = {
      assigner: {
        username: data.captains[0].username,
        fullname: data.captains[0].fullname
      },
      vehicle: {
        _id: vehicle0Id
      },
      from: {
        company: {
          _id: company0Id
        }
      },
      to: {
        company: {
          _id: company1Id
        }
      },
      product: {
        _id: product0Id
      }
    }
  })

  afterAll(async() => {
    await User.remove()
    await Vehicle.remove()
    await Transport.remove()
  })

  test('Should fetch a captain by username', async() => {
    expect.assertions(1)
    const res = await agent.get(CAPTAIN_ID_API.replace(/:username/, data.captains[0].username))
    expect(res.statusCode).toBe(200)
  })

  test('Should not fetch a captain by username', async() => {
    expect.assertions(1)
    const res = await agent.get(CAPTAIN_ID_API.replace(/:username/, data.captains[1].username))
    expect(res.statusCode).toBe(403)
  })

  test('Should change the password by username', async() => {
    expect.assertions(1)
    const res = await agent
      .put(CAPTAIN_ID_API.replace(/:username/, data.captains[0].username))
      .send({
        password: '12345'
      })
    expect(res.statusCode).toBe(200)
  })

  test('Should get all vehicle by username', async() => {
    expect.assertions(3)
    const res = await agent.get(CAPTAIN_VEHICLE_API.replace(/:username/, data.captains[0].username))
    expect(res.body).toHaveLength(1)
    expect(res.body[0].fuels[0]._id).toBe(fuel0Id)
    expect(res.body[0].maintenance[0]._id).toBe(maintain0Id)
  })

  test('Should update a fuel by id', async() => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.captains[0].username,
      ':childId': fuel0Id
    }
    const res = await agent
      .put(replaceAll(CAPTAIN_FUEL_ID_API, mapObj))
      .send({
        is_check: true
      })
    expect(res.statusCode).toBe(200)
    expect(res.body.fuels[0].is_check).toBeTruthy()
  })

  test('Should update a maintain by id', async() => {
    expect.assertions(2)
    const mapObj = {
      ':username': data.captains[0].username,
      ':childId': maintain0Id
    }
    const res = await agent
      .put(replaceAll(CAPTAIN_MAINTAIN_ID_API, mapObj))
      .send({
        is_check: true
      })
    expect(res.statusCode).toBe(200)
    expect(res.body.maintenance[0].is_check).toBeTruthy()
  })

  test('Should create a transport', async() => {
    expect.assertions(1)
    const res = await agent
      .post(
        CAPTAIN_TRANSPORT_API.replace(/:username/, data.captains[0].username)
      )
      .send(transport)
    expect(res.statusCode).toBe(200)
  })
})
