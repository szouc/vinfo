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
  TRANSPORT_ID_API,
  TRANSPORT_STATUS_API,
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
  applicant: {
    _id: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
    username: 'driver1_vehicle',
    fullname: 'test manager'
  },
  litre: 20,
  cost: 600,
  mile: 14435
}

const maintain = {
  applicant: {
    _id: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
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
  drivers: {
    principal: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
      username: 'driver1_vehicle',
      fullname: 'test manager'
    },
    secondary: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa733aa10'),
      username: 'driver2_vehicle',
      fullname: 'test manager'
    }
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
  drivers: {
    principal: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
      username: 'driver1_vehicle',
      fullname: 'test manager'
    },
    secondary: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa733aa10'),
      username: 'driver2_vehicle',
      fullname: 'test manager'
    }
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
  drivers: {
    secondary: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa833aa10'),
      username: 'driver1_vehicle',
      fullname: 'test manager'
    },
    principal: {
      _id: mongoose.Types.ObjectId('59acecec3884881aa733aa10'),
      username: 'driver2_vehicle',
      fullname: 'test manager'
    }
  }
}

let num
let transportId
let transportId2
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
  })

  afterAll(async () => {
    await User.remove()
    await Product.remove()
    await Company.remove()
    await Vehicle.remove()
    await Transport.remove()
  })

  test('Should create a transport', async () => {
    expect.assertions(3)
    const res = await agent.post(TRANSPORT_ROOT_API).send(transport)
    num = res.body[0].num
    expect(res.statusCode).toBe(200)
    expect(res.body[0].drivers.principal._id).toBe('59acecec3884881aa833aa10')
    expect(res.body[1].assigned).toBeTruthy()
  })

  test('Should create another transport', async () => {
    expect.assertions(2)
    const res = await agent.post(TRANSPORT_ROOT_API).send(transport2)
    const re = num + 1
    expect(res.statusCode).toBe(200)
    expect(res.body[0].num).toEqual(re)
  })

  test('Should not create a transport', async () => {
    expect.assertions(2)
    const res = await agent.post(TRANSPORT_ROOT_API).send(transport2)
    expect(res.statusCode).toBe(400)
    expect(res.text).toEqual('车辆已分配！')
  })

  test('Should fecth all transports', async () => {
    expect.assertions(1)
    const res = await agent.get(TRANSPORT_ROOT_API)
    transportId = res.body[1]._id
    transportId2 = res.body[0]._id
    expect(res.body).toHaveLength(2)
  })

  test('Should fetch a transport by id', async () => {
    expect.assertions(2)
    const res = await agent.get(TRANSPORT_ID_API.replace(/:id/, transportId))
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toEqual('assign')
  })

  test('Should change the transport status by id', async () => {
    expect.assertions(3)
    const res = await agent
      .put(TRANSPORT_STATUS_API.replace(/:id/, transportId))
      .send({ status: 'submit' })
    expect(res.statusCode).toBe(200)
    expect(res.body[0].status).toBe('submit')
    expect(res.body[1].assigned).toBeFalsy()
  })

  test('Should update transport by id', async () => {
    expect.assertions(2)
    const res = await agent
      .put(TRANSPORT_ID_API.replace(/:id/, transportId))
      .send(modifiedDrivers)
    expect(res.statusCode).toBe(200)
    expect(res.body.drivers.principal.username).toBe('driver2_vehicle')
  })

  test('Should delete transport by id', async () => {
    expect.assertions(2)
    const res = await agent.delete(TRANSPORT_ID_API.replace(/:id/, transportId))
    expect(res.statusCode).toBe(200)
    expect(res.body[1].assigned).toBeFalsy()
  })

  test('Should not change the transport status with driver_role', async () => {
    expect.assertions(2)
    await agent.post('/auth/login').send(driver1)
    const res = await agent
      .put(TRANSPORT_STATUS_API.replace(/:id/, transportId2))
      .send({ status: 'deny' })
    expect(res.statusCode).toBe(401)
    expect(res.text).toBe('Couldnt update other status with dirver_role')
  })
})