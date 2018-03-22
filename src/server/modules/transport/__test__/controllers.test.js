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
import * as Api from '../api'
import { data } from '../../../utils/mockData'

describe('Transport Base Operations', () => {
  let num
  let transportId
  let vehicle0
  // let transportId2
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.drivers[0])
    await agent.post('/auth/register').send(data.drivers[1])
    await agent.post('/auth/register').send(data.managers[0])
    await agent.post('/api/product').send(data.products[0])
    const res = await agent.post('/api/vehicle').send(data.vehicles[0])
    vehicle0 = res.body.result
    await agent.post('/api/vehicle').send(data.vehicles[1])
    await agent.post('/api/company').send(data.companies[0])
    await agent.post('/api/company').send(data.companies[1])
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
    data.transports[0].vehicle = vehicle0
    const res = await agent.post(Api.TRANSPORT_ROOT).send(data.transports[0])
    num = res.body.result[0].num
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].principal.username).toBe(
      data.transports[0].vehicle.principal.username
    )
    expect(res.body.result[0].assigned).toBeFalsy()
  })

  test('Should create another transport', async () => {
    expect.assertions(2)
    const res = await agent.post(Api.TRANSPORT_ROOT).send(data.transports[1])
    const re = num + 1
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].num).toEqual(re)
  })

  test('Should fetch transport by page_number = 1 and page_size = 2', async () => {
    expect.assertions(3)
    const res = await agent.get(`${Api.TRANSPORT_ROOT}?page=1&size=2`)
    expect(res.statusCode).toBe(200)
    expect(res.body.result).toHaveLength(2)
    expect(res.body.pagination.pageNumber).toBe(1)
  })

  test('Should not create a transport', async () => {
    expect.assertions(2)
    const res = await agent.post(Api.TRANSPORT_ROOT).send(transport2)
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toEqual('车辆不存在或已分配。')
  })

  test('Should fecth all transports', async () => {
    expect.assertions(1)
    const res = await agent.get(Api.TRANSPORT_ROOT)
    transportId = res.body.result[1]._id
    // transportId2 = res.body[0]._id
    expect(res.body.result).toHaveLength(2)
  })

  test('Should fetch a transport by id', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.TRANSPORT_ID.replace(/:id/, transportId))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.captain_status).toEqual('assign')
  })

  test('Should change the transport status by id', async () => {
    expect.assertions(3)
    const res = await agent
      .put(Api.TRANSPORT_STATUS.replace(/:id/, transportId))
      .send({ captain_status: 'submit' })
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].captain_status).toBe('submit')
    expect(res.body.result[1].assigned).toBeFalsy()
  })

  test('Should update transport by id', async () => {
    expect.assertions(2)
    const res = await agent
      .put(Api.TRANSPORT_ID.replace(/:id/, transportId))
      .send(modifiedDrivers)
    expect(res).toBe(200)
    expect(res.body.result.principal.username).toBe('driver2_vehicle')
  })

  test('Should delete transport by id', async () => {
    expect.assertions(2)
    const res = await agent.delete(Api.TRANSPORT_ID.replace(/:id/, transportId))
    expect(res.statusCode).toBe(200)
    expect(res.body.result[1]).toBeFalsy()
    // expect(res.body.result).toBe(200)
  })
})
