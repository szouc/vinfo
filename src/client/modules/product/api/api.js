// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import * as Request from './request'
import { productNormalize, productArrayNormalize } from '@clientSettings/schema'

const STATUS_OK = 200

async function createProduct(payload: Immut): ?Immut {
  const response = await Request.createProduct(payload)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const product = productNormalize(data)
    return fromJS(product)
  }
  throw new Error('Couldnt create a new product')
}

async function getAllProducts(): ?Immut {
  const response = await Request.getAllProducts()
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const products = productArrayNormalize(data)
    return fromJS(products)
  }
  throw new Error('Something wrong at getAllProducts Process')
}

async function getProductsWithPg(payload: {
  pageNumber: Number,
  pageSize: Number,
  fromDate: String,
  toDate: String
}): ?Immut {
  const response = await Request.getProductsWithPg(
    payload.pageNumber,
    payload.pageSize,
    payload.fromDate,
    payload.toDate
  )
  if (response.status === STATUS_OK) {
    const { result, pagination } = response.data
    const products = productArrayNormalize(result)
    return fromJS({ product: products, pagination })
  }
  throw new Error('Something wrong at getProductsWithPg Process')
}

async function createPriceHistory(payload: Immut): ?Immut {
  const productId = payload.get('productId')
  const priceHistory = payload.getIn(['values', 'price_history'])
  const response = await Request.createPriceHistory(productId, priceHistory)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const product = productNormalize(data)
    return fromJS(product)
  }
  throw new Error('Couldnt create a new price_history')
}

async function deleteProductById(id: string) {
  const response = await Request.deleteProductById(id)
  if (response.status === STATUS_OK) {
    return fromJS({ id })
  }
  throw new Error('Something wrong at deleteProductById Process')
}

async function deletePriceHistoryById(payload: Immut) {
  const productId = payload.get('productId')
  const priceHistoryId = payload.get('priceHistoryId')
  const response = await Request.deletePriceHistoryById(
    productId,
    priceHistoryId
  )
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const product = productNormalize(data)
    return fromJS(product)
  }
  throw new Error('Something wrong at deletePriceHistoryById Process')
}

async function updateProductById(payload: Immut) {
  const productId = payload.get('productId')
  const update = payload.get('values')
  const response = await Request.updateProductById(productId, update)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const product = productNormalize(data)
    return fromJS(product)
  }
  throw new Error('Couldnt update a product by Id')
}

export {
  createProduct,
  getAllProducts,
  getProductsWithPg,
  createPriceHistory,
  deleteProductById,
  deletePriceHistoryById,
  updateProductById
}
