import moment from 'moment'
import mongoose from 'mongoose'
import { Vehicle } from '../models'
import { User } from '../../user/models'
import app from '../../../app'
import request from 'supertest'
// import { replaceAll } from '../../../utils/replaceAll'
import {
  // VEHICLE_DRIVER_ID_API,
  // VEHICLE_FUEL_ID_API,
  // VEHICLE_MAINTAIN_ID_API,
  // VEHICLE_DRIVER_API,
  // VEHICLE_FUEL_API,
  // VEHICLE_MAINTAIN_API,
  // VEHICLE_ID_API,
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
  _id: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
  username: 'driver1_vehicle',
  password: '123',
  fullname: 'test manager',
  role: 'driver',
  gender: 'male',
  active: true
}

const driver2 = {
  _id: mongoose.Types.ObjectId('59acecec3884881aa733aa10'),
  username: 'driver2_vehicle',
  password: '123',
  fullname: 'test manager',
  role: 'driver',
  gender: 'male',
  active: true
}

const fuel = {
  applicant: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
  litre: 20,
  cost: 600,
  mile: 14435
}

const maintain = {
  applicant: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
  reason: '换轮胎',
  cost: 1000,
  mile: 17333
}

const vehicle = {
  plate: '鲁B 12345',
  model: '解放',
  purchase_date: moment('01/12/2017', 'MM/DD/YYYY', true),
  init_mile: 123456,
  drivers: [
    {
      principal: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
      secondary: mongoose.Types.ObjectId('59acecec3884881aa733aa10'),
      default: true
    }
  ],
  fuels: [
    fuel
  ],
  maintenance: [
    maintain
  ]
}

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
})
