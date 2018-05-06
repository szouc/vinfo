// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import * as Request from './request'
import { productNormalize, productArrayNormalize } from '@clientSettings/schema'

async function createProduct(payload: Immut): ?Immut {
  const response = await Request.createProduct(payload)
  console.log(typeof response.data.ok)
  if (response.data.ok) {
    const data = response.data.result
    const product = productNormalize(data)
    return fromJS(product)
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
  }
  throw new Error('Couldnt create a new product')
}

async function getAllProducts(): ?Immut {
  const response = await Request.getAllProducts()
  if (response.data.ok) {
    const data = response.data.result
    const products = productArrayNormalize(data)
    return fromJS(products)
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
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
  if (response.data.ok) {
    const { result, pagination } = response.data
    const products = productArrayNormalize(result)
    return fromJS({ product: products, pagination })
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
  }
  throw new Error('Something wrong at getProductsWithPg Process')
}

async function createPriceHistory(payload: Immut): ?Immut {
  const productId = payload.get('productId')
  const priceHistory = payload.getIn(['values', 'priceHistory'])
  const response = await Request.createPriceHistory(productId, priceHistory)
  if (response.data.ok) {
    const data = response.data.result
    const product = productNormalize(data)
    return fromJS(product)
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
  }
  throw new Error('Couldnt create a new priceHistory')
}

async function deleteProductById(id: string) {
  const response = await Request.deleteProductById(id)
  if (response.data.ok) {
    return fromJS({ id })
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
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
  if (response.data.ok) {
    const data = response.data.result
    const product = productNormalize(data)
    return fromJS(product)
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
  }
  throw new Error('Something wrong at deletePriceHistoryById Process')
}

async function updateProductById(payload: Immut) {
  const productId = payload.get('productId')
  const update = payload.get('values')
  const response = await Request.updateProductById(productId, update)
  if (response.data.ok) {
    const data = response.data.result
    const product = productNormalize(data)
    return fromJS(product)
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
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
