import moment from 'moment'
import { Product } from '../models'
import { User } from '../../user/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import * as Api from '../api'
import { data } from '../../../utils/mockData'

const manager = {
  username: 'manager_product',
  password: '123',
  fullname: 'test manager',
  role: 'manager',
  gender: 'male',
  active: true
}

const singlePriceHistory = [
  {
    price: 180,
    start: moment('01/12/2017', 'MM/DD/YYYY', true),
    end: moment('02/12/2017', 'MM/DD/YYYY', true)
  }
]

const multiPriceHistory = [
  {
    price: 220,
    start: moment('03/12/2017', 'MM/DD/YYYY', true),
    end: moment('03/22/2017', 'MM/DD/YYYY', true)
  },
  {
    price: 215,
    start: moment('04/12/2017', 'MM/DD/YYYY', true),
    end: moment('04/22/2017', 'MM/DD/YYYY', true)
  }
]

const product = {
  name: '硫酸',
  specs: '98%',
  pricing: '200'
}

const modifiedProduct = {
  specs: '95%',
  pricing: 500
}

describe('Product Base Operations', () => {
  let productId
  let priceHistoryId
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(data.managers[0])
  })

  afterAll(async () => {
    await User.remove()
    await Product.remove()
  })

  test('Should create a product', async () => {
    expect.assertions(2)
    const res = await agent.post(Api.PRODUCT_ROOT).send(data.products[0])
    expect(res.statusCode).toBe(200)
    expect(res.body.result.name).toBe(data.products[0].name)
  })

  test('Should not create a product', async () => {
    expect.assertions(1)
    const res = await agent.post(Api.PRODUCT_ROOT).send(data.products[0])
    expect(res.statusCode).toBe(400)
  })

  test('Should get all products', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.PRODUCT_ALL)
    productId = res.body.result[0]._id
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].name).toEqual(data.products[0].name)
  })

  test('Should get products by page_number = 1 and page_size =2', async () => {
    expect.assertions(2)
    const res = await agent.get(`${Api.PRODUCT_ROOT}?page=1&size=2`)
    expect(res.statusCode).toBe(200)
    expect(res.body.result[0].name).toBe(data.products[0].name)
  })

  test('Should get product by id', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.PRODUCT_ID.replace(/:id/, productId))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.name).toBe(data.products[0].name)
  })

  test('Should not get product by id', async () => {
    expect.assertions(1)
    const res = await agent.get(
      Api.PRODUCT_ID.replace(/:id/, '59a25d39082e0f3954207953')
    )
    expect(res.statusCode).toBe(400)
  })

  test('Should update product by id', async () => {
    expect.assertions(2)
    const res = await agent
      .put(Api.PRODUCT_ID.replace(/:id/, productId))
      .send(data.products[1])
    expect(res.statusCode).toBe(200)
    expect(res.body.result.pricing).toBe(data.products[1].pricing)
  })

  test('Should add single price history to a specific product', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.PRODUCT_ID.replace(/:id/, productId))
    let countOfPH = res1.body.result.price_history.length
    const res = await agent
      .post(Api.PRODUCT_PRICE_HISTORY.replace(/:id/, productId))
      .send([data.priceHistories[0]])
    expect(res.statusCode).toBe(200)
    expect(res.body.result.price_history).toHaveLength(countOfPH + 1)
  })

  test('Should add multi price histories to a specific product document', async () => {
    expect.assertions(2)
    const res1 = await agent.get(Api.PRODUCT_ID.replace(/:id/, productId))
    let countOfPH = res1.body.result.price_history.length
    const res = await agent
      .post(Api.PRODUCT_PRICE_HISTORY.replace(/:id/, productId))
      .send([data.priceHistories[1], data.priceHistories[2]])
    expect(res.statusCode).toBe(200)
    expect(res.body.result.price_history).toHaveLength(countOfPH + 2)
  })

  test('Should delete a price history from the specific product', async () => {
    expect.assertions(2)
    const res = await agent.get(Api.PRODUCT_ID.replace(/:id/, productId))
    let countOfPH = res.body.result.price_history.length
    priceHistoryId = res.body.result.price_history[0]._id
    const mapObj = {
      ':id': productId,
      ':childId': priceHistoryId
    }
    const res2 = await agent.delete(
      replaceAll(Api.PRODUCT_PRICE_HISTORY_ID, mapObj)
    )
    expect(res2.statusCode).toBe(200)
    expect(res2.body.result.price_history).toHaveLength(countOfPH - 1)
  })

  test('Should delete product by id', async () => {
    expect.assertions(2)
    const res = await agent.delete(Api.PRODUCT_ID.replace(/:id/, productId))
    expect(res.statusCode).toBe(200)
    expect(res.body.result.active).toBeFalsy()
  })
})
