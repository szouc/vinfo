import moment from 'moment'
// import mongoose from 'mongoose'
import { Vehicle } from '../models'
import { User } from '../../user/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import {
  VEHICLE_FUEL_ID_API,
  VEHICLE_MAINTAIN_ID_API,
  VEHICLE_FUEL_API,
  VEHICLE_MAINTAIN_API,
  VEHICLE_ID_API,
  VEHICLE_ROOT_API
} from '../routes'

const manager = {
  username: 'manager_vehicle',
  password: '123',
  fullname: 'test manager',
  role: 'manager',
  gender: 'male',
  active: true
}

const driver1 = {
  username: 'driver1_vehicle',
  password: '123',
  fullname: 'test manager',
  role: 'driver',
  gender: 'male',
  active: true
}

const driver2 = {
  username: 'driver2_vehicle',
  password: '123',
  fullname: 'test manager',
  role: 'driver',
  gender: 'male',
  active: true
}

const fuel = {
  applicant: {
    username: 'driver1_vehicle',
    fullname: 'test manager'
  },
  litre: 20,
  cost: 600,
  mile: 14435
}

const maintain = {
  applicant: {
    username: 'driver1_vehicle',
    fullname: 'test manager'
  },
  reason: '换轮胎',
  cost: 1000,
  mile: 17333
}

const anotherFuel = {
  applicant: {
    username: 'driver1_vehicle',
    fullname: 'test manager'
  },
  litre: 30,
  cost: 700,
  mile: 24435
}

const anotherMaintain = {
  applicant: {
    username: 'driver1_vehicle',
    fullname: 'test manager'
  },
  reason: '换机油',
  cost: 200,
  mile: 19333
}

const vehicle = {
  plate: '鲁B 12345',
  engine: 'L23421342345',
  model: '解放',
  purchase_date: moment('01/12/2017', 'MM/DD/YYYY', true),
  init_mile: 123456,
  principal: {
    username: 'driver1_vehicle',
    fullname: 'test manager'
  },
  secondary: {
    username: 'driver2_vehicle',
    fullname: 'test manager'
  },
  fuels: [fuel],
  maintenance: [maintain]
}

const anotherVehicle = {
  plate: '鲁B 54321',
  engine: 'L2342907sdfs',
  model: '解放',
  purchase_date: moment('01/12/2017', 'MM/DD/YYYY', true),
  init_mile: 123456,
  principal: {
    username: 'driver1_vehicle',
    fullname: 'test manager'
  },
  secondary: {
    username: 'driver2_vehicle',
    fullname: 'test manager'
  },
  fuels: [fuel, anotherFuel],
  maintenance: [maintain]
}

const modifiedVehicle = {
  model: '东风',
  secondary: {
    username: 'driver1_vehicle',
    fullname: 'test manager'
  },
  principal: {
    username: 'driver2_vehicle',
    fullname: 'test manager'
  }
}

let vehicleId
let fuelId
let maintenanceId
describe('Vehicle Base Operations', () => {
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(driver1)
    await agent.post('/auth/register').send(driver2)
    await agent.post('/auth/register').send(manager)
  })

  afterAll(async () => {
    await User.remove()
    await Vehicle.remove()
  })

  test('Should create a vehicle', async () => {
    expect.assertions(1)
    const res = await agent.post(VEHICLE_ROOT_API).send(vehicle)
    expect(res.statusCode).toBe(200)
  })

  test('Should not create a vehicle', async () => {
    expect.assertions(1)
    const res = await agent.post(VEHICLE_ROOT_API).send(vehicle)
    expect(res.statusCode).toBe(500)
  })

  test('Should fetch all vehicles', async () => {
    expect.assertions(3)
    await agent.post(VEHICLE_ROOT_API).send(anotherVehicle)
    const res = await agent.get(VEHICLE_ROOT_API)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].plate).toEqual('鲁B 12345')
    expect(res.body).toHaveLength(2)
  })

  test('Should fetch a vehicle by id', async () => {
    expect.assertions(2)
    const res1 = await agent.get(VEHICLE_ROOT_API)
    vehicleId = res1.body[0]._id
    fuelId = res1.body[0].fuels[0]._id
    maintenanceId = res1.body[0].maintenance[0]._id
    const res = await agent.get(VEHICLE_ID_API.replace(/:id/, vehicleId))
    expect(res.statusCode).toBe(200)
    expect(res.body.plate).toEqual('鲁B 12345')
  })

  test('Should update a vehicle by id', async () => {
    expect.assertions(3)
    const res = await agent
      .put(VEHICLE_ID_API.replace(/:id/, vehicleId))
      .send(modifiedVehicle)
    expect(res.statusCode).toBe(200)
    expect(res.body.model).toBe('东风')
    expect(res.body.principal.username).toBe('driver2_vehicle')
  })

  test('Should fetch some fuel or maintain refs', async () => {
    expect.assertions(2)
    const res = await agent.get(VEHICLE_ROOT_API)
    expect(res.body[0].fuels[0].litre).toBe(20)
    expect(res.body[0].maintenance[0].reason).toBe('换轮胎')
  })

  test('Should add some fuel', async () => {
    expect.assertions(2)
    const res = await agent
      .post(VEHICLE_FUEL_API.replace(/:id/, vehicleId))
      .send([anotherFuel])
    expect(res.statusCode).toBe(200)
    expect(res.body.fuels[1].litre).toBe(30)
  })

  test('Should add some maintenance', async () => {
    expect.assertions(2)
    const res = await agent
      .post(VEHICLE_MAINTAIN_API.replace(/:id/, vehicleId))
      .send([anotherMaintain])
    expect(res.statusCode).toBe(200)
    expect(res.body.maintenance[1].reason).toBe('换机油')
  })

  test('Should delete some fuels', async () => {
    expect.assertions(2)
    const mapObj = {
      ':id': vehicleId,
      ':childId': fuelId
    }
    const res = await agent.delete(replaceAll(VEHICLE_FUEL_ID_API, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.fuels).toHaveLength(1)
  })

  test('Should delete some maintenance', async () => {
    expect.assertions(2)
    const mapObj = {
      ':id': vehicleId,
      ':childId': maintenanceId
    }
    const res = await agent.delete(replaceAll(VEHICLE_MAINTAIN_ID_API, mapObj))
    expect(res.statusCode).toBe(200)
    expect(res.body.maintenance).toHaveLength(1)
  })

  test('Should delete a vehicle by id', async () => {
    expect.assertions(2)
    const res = await agent.delete(VEHICLE_ID_API.replace(/:id/, vehicleId))
    expect(res.statusCode).toBe(200)
    expect(res.body.active).toBeFalsy()
  })
})
