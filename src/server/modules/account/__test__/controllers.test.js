import moment from 'moment'
import mongoose from 'mongoose'
import { Transport } from '../../transport/models'
import { User } from '../../user/models'
import { Vehicle } from '../../vehicle/models'
import { Company } from '../../company/models'
import { Product } from '../../product/models'
import app from '../../../app'
import request from 'supertest'
// import { replaceAll } from '../../../utils/replaceAll'
import { ACCOUNT_ID_API, ACCOUNT_STATUS_API, ACCOUNT_ROOT_API } from '../routes'

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

const vehicle = {
  _id: mongoose.Types.ObjectId('59acecec3884881aa3333333'),
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
  assign: false,
  fuels: [fuel],
  maintenance: [maintain]
}

const vehicle1 = {
  _id: mongoose.Types.ObjectId('59acecec3884881aa4444444'),
  plate: '鲁B 54321',
  engine: 'L23421343fs5',
  model: '东风',
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
  assign: false,
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
  vehicle: {
    _id: mongoose.Types.ObjectId('59acecec3884881aa3333333'),
    plate: '鲁B 12345',
    engine: 'L23421342345'
  },
  from: {
    company: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa6666666'),
      name: '青岛利特1',
      addr: '市北区黑龙江路'
    },
    weight: 200,
    date: moment('2017/09/22', 'YYYY/MM/DD')
  },
  to: {
    company: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa7777777'),
      name: '青岛利特2',
      addr: '市北区黑龙江路'
    },
    weight: 200,
    date: moment('2017/09/22', 'YYYY/MM/DD')
  },
  product: {
    _id: mongoose.Types.ObjectId('59acecec3884881aa5555555'),
    name: '硫酸',
    specs: '98%'
  }
}

const transport2 = {
  vehicle: {
    _id: mongoose.Types.ObjectId('59acecec3884881aa4444444'),
    plate: '鲁B 54321',
    engine: 'L23421343fs5'
  },
  from: {
    company: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa6666666'),
      name: '青岛利特1',
      addr: '市北区黑龙江路'
    },
    weight: 100,
    date: moment('2017/09/12', 'YYYY/MM/DD')
  },
  to: {
    company: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa7777777'),
      name: '青岛利特2',
      addr: '市北区黑龙江路'
    },
    weight: 100,
    date: moment('2017/09/12', 'YYYY/MM/DD')
  },
  product: {
    _id: mongoose.Types.ObjectId('59acecec3884881aa5555555'),
    name: '硫酸',
    specs: '98%'
  }
}

const modifiedDrivers = {
  secondary: {
    username: 'driver1_vehicle',
    fullname: 'test manager'
  },
  principal: {
    username: 'driver2_vehicle',
    fullname: 'test manager'
  }
}

let accountId
let accountId2
describe('Transport Base Operations', () => {
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(driver1)
    await agent.post('/auth/register').send(driver2)
    await agent.post('/auth/register').send(manager)
    await agent.post('/api/product').send(product)
    await agent.post('/api/vehicle').send(vehicle)
    await agent.post('/api/vehicle').send(vehicle1)
    await agent.post('/api/company').send(company1)
    await agent.post('/api/company').send(company2)
    await agent.post('/api/transport').send(transport)
    await agent.post('/api/transport').send(transport2)
  })

  afterAll(async () => {
    await User.remove()
    await Product.remove()
    await Company.remove()
    await Vehicle.remove()
    await Transport.remove()
  })

  test('Should fecth all accounts', async () => {
    expect.assertions(1)
    const res = await agent.get(ACCOUNT_ROOT_API)
    accountId = res.body[1]._id
    accountId2 = res.body[0]._id
    expect(res.body).toHaveLength(2)
  })

  test('Should fetch a account by id', async () => {
    expect.assertions(2)
    const res = await agent.get(ACCOUNT_ID_API.replace(/:id/, accountId))
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toEqual('assign')
  })

  test('Should update account by id', async () => {
    expect.assertions(2)
    const res = await agent
      .put(ACCOUNT_ID_API.replace(/:id/, accountId))
      .send(modifiedDrivers)
    expect(res.statusCode).toBe(200)
    expect(res.body.principal.username).toBe('driver2_vehicle')
  })

  test('Should delete account by id', async () => {
    expect.assertions(2)
    const res = await agent.delete(ACCOUNT_ID_API.replace(/:id/, accountId))
    expect(res.statusCode).toBe(200)
    expect(res.body.active).toBeFalsy()
  })

  test('Should change account status by id', async () => {
    expect.assertions(2)
    const res = await agent
      .put(ACCOUNT_STATUS_API.replace(/:id/, accountId2))
      .send({ account_status: 'pass' })
    expect(res.statusCode).toBe(200)
    expect(res.body.account_status).toEqual('pass')
  })
})
