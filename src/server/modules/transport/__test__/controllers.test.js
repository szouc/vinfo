import moment from 'moment'
import mongoose from 'mongoose'
import { Transport } from '../models'
import { User } from '../../user/models'
import { Vehicle } from '../../vehicle/models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
// import { replaceAll } from '../../../utils/replaceAll'
import {
  // TRANSPORT_ID_API,
  TRANSPORT_ROOT_API
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
  _id: mongoose.Types.ObjectId('59acecec3884881aa3333333'),
  plate: '鲁B 12345',
  engine: 'L23421342345',
  model: '解放',
  purchase_date: moment('01/12/2017', 'MM/DD/YYYY', true),
  init_mile: 123456,
  drivers: {
    principal: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
    secondary: mongoose.Types.ObjectId('59acecec3884881aa733aa10')
  },
  fuels: [fuel],
  maintenance: [maintain]
}

const product = {
  _id: mongoose.Types.ObjectId('59acecec3884881aa5555555'),
  name: '硫酸',
  specs: '98%',
  pricing: '200'
}

const company1 = {
  _id: mongoose.Types.ObjectId('59acecec3884881aa6666666'),
  name: '青岛利特1',
  addr: '市北区黑龙江路'
}

const company2 = {
  _id: mongoose.Types.ObjectId('59acecec3884881aa7777777'),
  name: '青岛利特2',
  addr: '市北区黑龙江路'
}

const transport = {
  vehicle: mongoose.Types.ObjectId('59acecec3884881aa3333333'),
  from: {
    company: mongoose.Types.ObjectId('59acecec3884881aa6666666'),
    weight: 200,
    date: moment('2017/09/22', 'YYYY/MM/DD')
  },
  to: {
    company: mongoose.Types.ObjectId('59acecec3884881aa7777777'),
    weight: 200,
    date: moment('2017/09/22', 'YYYY/MM/DD')
  },
  product: mongoose.Types.ObjectId('59acecec3884881aa5555555'),
  status: 'assign'
}

describe('Transport Base Operations', () => {
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(driver1)
    await agent.post('/auth/register').send(driver2)
    await agent.post('/auth/register').send(manager)
    await agent.post('/api/product').send(product)
    await agent.post('/api/vehicle').send(vehicle)
    await agent.post('/api/company').send(company1)
    await agent.post('/api/company').send(company2)
  })

  afterAll(async () => {
    await User.remove()
    await Vehicle.remove()
    await Transport.remove()
    await Product.remove()
    await Company.remove()
  })

  test('Should create a transport', async () => {
    expect.assertions(1)
    const res = await agent.post(TRANSPORT_ROOT_API).send(transport)
    expect(res).toBe(200)
  })
})
