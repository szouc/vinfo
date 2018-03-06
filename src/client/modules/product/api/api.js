// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { replaceAll } from '@clientUtils/replaceAll'

import { productNormalize, productArrayNormalize } from '../schema'
import * as Api from './apiRoutes'

import fetch from '@clientUtils/fetch'

const STATUS_OK = 200

async function createProduct(payload: Immut): ?Immut {
  const options = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(Api.PRODUCT_ROOT, options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const product = productNormalize(data)
    return fromJS(product)
  }
  throw new Error('Couldnt create a new product')
}

async function getAllProducts(): ?Immut {
  const options = {
    method: 'get'
  }
  const response = await fetch(Api.PRODUCT_ROOT, options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const products = productArrayNormalize(data.result)
    return fromJS(products)
  }
  throw new Error('Something wrong at getAllCompanies Process')
}

async function createPriceHistory(payload: Immut): ?Immut {
  const productId = payload.get('productId')
  const options = {
    method: 'post',
    body: JSON.stringify(payload.getIn(['values', 'price_history'])),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(
    Api.PRODUCT_PRICE_HISTORY.replace(/:id/, productId),
    options
  )
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const product = productNormalize(data)
    return fromJS(product)
  }
  throw new Error('Couldnt create a new product')
}

async function deleteProductById(id: string) {
  const options = {
    method: 'delete'
  }
  const response = await fetch(Api.PRODUCT_ID.replace(/:id/, id), options)
  if (response.status === STATUS_OK) {
    return id
  }
  throw new Error('Something wrong at deleteProductById Process')
}

async function deletePriceHistoryById(payload: Immut) {
  const options = {
    method: 'delete'
  }
  const mapObj = {
    ':id': payload.get('productId'),
    ':childId': payload.get('priceHistoryId')
  }
  const response = await fetch(
    replaceAll(Api.PRODUCT_PRICE_HISTORY_ID, mapObj),
    options
  )
  if (response.status === STATUS_OK) {
    return payload
  }
  throw new Error('Something wrong at deletePriceHistoryById Process')
}

async function updateProductById(payload: Immut) {
  const options = {
    method: 'put',
    body: JSON.stringify(payload.get('values')),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(Api.PRODUCT_ID.replace(/:id/, payload.get('productId')), options)
  if (response) {
    const data = await response.json()
    const product = productNormalize(data)
    return fromJS(product)
  }
  throw new Error('Couldnt update a product by Id')
}

export {
  createProduct,
  getAllProducts,
  createPriceHistory,
  deleteProductById,
  deletePriceHistoryById,
  updateProductById
}
