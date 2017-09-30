import Mock from 'mockjs'
import { Vehicle } from '../models'
import { User } from '../../user/models'
import app from '../../../app'
import request from 'supertest'
// import { replaceAll } from '../../../utils/replaceAll'
import { DRIVER_FUEL_API, DRIVER_ID_API } from '../routes'

const driverTemplate = {
  username: () => Mock.Random.natural(10000, 99999),
  password: '123',
  fullname: () => Mock.Random.cname(),
  gender: 'male',
  role: 'driver'
}

const managerTemplate = {
  ...driverTemplate,
  role: 'manager'
}

const vehicleTemplate = {
  plate: () => Mock.Random.string('upper', 7),
  engine: () => Mock.Random.string('number', 7),
  model: () => Mock.Random.string('lower', 7)
}

const fuelTemplate = {
  litre: () => Mock.Random.natural(30, 50),
  cost: () => Mock.Random.natural(100, 500),
  mile: () => Mock.Random.natural(12345, 34352)
}

const maintainTemplate = {
  reason: () => Mock.Random.string('lower', 50),
  cost: () => Mock.Random.natural(100, 500),
  mile: () => Mock.Random.natural(12345, 34352)
}

const data = Mock.mock({
  'managers|2': [managerTemplate],
  'drivers|5': [driverTemplate],
  'vehicles|5': [vehicleTemplate],
  'fuels|5': [fuelTemplate],
  'maintains|5': [maintainTemplate]
})

let vehicle0Id
describe('Driver Base Operations', () => {
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.drivers[0])
    await agent.post('/auth/register').send(data.drivers[1])
    await agent.post('/auth/register').send(data.managers[0])
    const res = await agent.post('/api/vehicle').send(data.vehicles[0])
    vehicle0Id = res.body._id
    await agent.post('/api/vehicle').send(data.vehicles[1])
    await agent.post('/api/vehicle').send(data.vehicles[2])
    await agent
      .put(`/api/vehicle/${vehicle0Id}`)
      .send({
        principal: {
          username: data.drivers[0].username,
          fullname: data.drivers[0].fullname
        },
        secondary: {
          username: data.drivers[1].username,
          fullname: data.drivers[1].fullname
        }
      })
    await agent.post('/auth/register').send(data.drivers[2])
  })

  afterAll(async () => {
    await User.remove()
    await Vehicle.remove()
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
    expect(res.body.fuels[0].litre).toBe(data.fuels[1].litre)
  })
})
