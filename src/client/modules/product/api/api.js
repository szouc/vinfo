// @flow

import { normalize, denormalize } from 'normalizr'
import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'

import { priceHistorySchema, productSchema } from './schema'
import {
  // PRODUCT_ID_API,
  // PRODUCT_QUESRY_API,
  PRODUCT_PRICE_HISTORY_API,
  // PRODUCT_PRICE_HISTORY_ID_API,
  PRODUCT_ROOT_API
} from './apiRoutes'

import fetch from '../../../utils/fetch'

const STATUS_OK = 200

async function createProduct(payload: Immut): ?Immut {
  const options = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(PRODUCT_ROOT_API, options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const product = normalize(data, productSchema)
    return fromJS(product)
  }
  throw new Error('Couldnt create a new product')
}

async function createPriceHistory(payload: Immut): ?Immut {
  const options = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(PRODUCT_PRICE_HISTORY_API, options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const product = normalize(data, productSchema)
    return fromJS(product)
  }
  throw new Error('Couldnt create a new product')
}

const selectProduct = (state: Object, id: string) =>
  denormalize(id, productSchema, state)
const selectPriceHistory = (state: Object, id: string) =>
  denormalize(id, priceHistorySchema, state)

export { selectProduct, selectPriceHistory, createProduct, createPriceHistory }
