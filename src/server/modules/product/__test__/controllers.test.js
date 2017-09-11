import moment from 'moment'
import { Product } from '../models'
import { User } from '../../user/models'
import app from '../../../app'
import request from 'supertest'
import { replaceAll } from '../../../utils/replaceAll'
import {
  PRODUCT_ID_API,
  PRODUCT_PRICE_HISTORY_API,
  PRODUCT_PRICE_HISTORY_ID_API,
  // PRODUCT_QUERY_API,
  PRODUCT_ROOT_API
} from '../routes'

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

let productId
let priceHistoryId
describe('Product Base Operations', () => {
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/auth/register').send(manager)
  })

  afterAll(async () => {
    await User.remove()
    await Product.remove()
  })

  test('Should create a product', async () => {
    expect.assertions(1)
    const res = await agent.post(PRODUCT_ROOT_API).send(product)
    expect(res.statusCode).toBe(200)
  })

  test('Should not create a product', async () => {
    expect.assertions(1)
    const res = await agent.post(PRODUCT_ROOT_API).send(product)
    expect(res.statusCode).toBe(500)
  })

  test('Should get all products', async () => {
    expect.assertions(2)
    const res = await agent.get(PRODUCT_ROOT_API)
    productId = res.body[0]._id
    expect(res.statusCode).toBe(200)
    expect(res.body[0].name).toEqual(product.name)
  })

  test('Should get product by id', async () => {
    expect.assertions(1)
    const res = await agent.get(PRODUCT_ID_API.replace(/:id/, productId))
    expect(res.statusCode).toBe(200)
  })

  test('Should not get product by id', async () => {
    expect.assertions(1)
    const res = await agent.get(
      PRODUCT_ID_API.replace(/:id/, '59a25d39082e0f3954207953')
    )
    expect(res.statusCode).toBe(400)
  })

  test('Should update product by id', async () => {
    expect.assertions(2)
    const res = await agent
      .put(PRODUCT_ID_API.replace(/:id/, productId))
      .send(modifiedProduct)
    expect(res.statusCode).toBe(200)
    expect(res.body.pricing).toBe(500)
  })

  test('Should add single price history to a specific product', async () => {
    expect.assertions(2)
    // await agent.get(PRODUCT_ID_API.replace(/:id/, productId))
    const res = await agent
      .post(PRODUCT_PRICE_HISTORY_API.replace(/:id/, productId))
      .send(singlePriceHistory)
    expect(res.statusCode).toBe(200)
    expect(res.body.price_history[0].price).toEqual(singlePriceHistory[0].price)
  })

  test('Should add multi price histories to a specific product document', async () => {
    expect.assertions(2)
    // await agent.get(PRODUCT_ID_API.replace(/:id/, productId))
    const res = await agent
      .post(PRODUCT_PRICE_HISTORY_API.replace(/:id/, productId))
      .send(multiPriceHistory)
    expect(res.statusCode).toBe(200)
    expect(res.body.price_history).toHaveLength(3)
  })

  test('Should delete a price history from the specific product', async () => {
    expect.assertions(1)
    const res = await agent.get(PRODUCT_ID_API.replace(/:id/, productId))
    priceHistoryId = res.body.price_history[0]._id
    const mapObj = {
      ':id': productId,
      ':childId': priceHistoryId
    }
    const res2 = await agent.delete(
      replaceAll(PRODUCT_PRICE_HISTORY_ID_API, mapObj)
    )
    expect(res2.statusCode).toBe(200)
  })

  test('Should delete product by id', async () => {
    expect.assertions(1)
    const res = await agent.delete(PRODUCT_ID_API.replace(/:id/, productId))
    expect(res.statusCode).toBe(200)
  })
})
