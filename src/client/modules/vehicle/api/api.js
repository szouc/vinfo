// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
// import { replaceAll } from '@clientUtils/replaceAll'

import {
  vehicleArrayNormalize,
  vehicleNormalize
} from '../schema'

import {
  VEHICLE_ID_API,
  VEHICLE_ROOT_API
} from './apiRoutes'

import fetch from '@clientUtils/fetch'

const STATUS_OK = 200

async function createVehicle(payload: Immut): ?Immut {
  const options = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(VEHICLE_ROOT_API, options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const vehicle = vehicleNormalize(data)
    return fromJS(vehicle)
  }
  throw new Error('Couldnt create a new vehicle')
}

async function getAllVehicles(): ?Immut {
  const options = {
    method: 'get'
  }
  const response = await fetch(VEHICLE_ROOT_API, options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const vehicles = vehicleArrayNormalize(data)
    return fromJS(vehicles)
  }
  throw new Error('Something wrong at getAllVehicles Process')
}

// async function createPriceHistory(payload: Immut): ?Immut {
//   const productId = payload.get('productId')
//   const options = {
//     method: 'post',
//     body: JSON.stringify(payload.getIn(['values', 'price_history'])),
//     headers: { 'Content-Type': 'application/json' }
//   }
//   const response = await fetch(
//     PRODUCT_PRICE_HISTORY_API.replace(/:id/, productId),
//     options
//   )
//   if (response.status === STATUS_OK) {
//     const data = await response.json()
//     const product = productNormalize(data)
//     return fromJS(product)
//   }
//   throw new Error('Couldnt create a new product')
// }

async function deleteVehicleById(id: string) {
  const options = {
    method: 'delete'
  }
  const response = await fetch(VEHICLE_ID_API.replace(/:id/, id), options)
  if (response.status === STATUS_OK) {
    return id
  }
  throw new Error('Something wrong at deleteVehicleById Process')
}

// async function deletePriceHistoryById(payload: Immut) {
//   const options = {
//     method: 'delete'
//   }
//   const mapObj = {
//     ':id': payload.get('productId'),
//     ':childId': payload.get('priceHistoryId')
//   }
//   const response = await fetch(
//     replaceAll(PRODUCT_PRICE_HISTORY_ID_API, mapObj),
//     options
//   )
//   if (response.status === STATUS_OK) {
//     return payload
//   }
//   throw new Error('Something wrong at deletePriceHistoryById Process')
// }

async function updateVehicleById(payload: Immut) {
  const options = {
    method: 'put',
    body: JSON.stringify(payload.get('values')),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(VEHICLE_ID_API.replace(/:id/, payload.get('vehicleId')), options)
  if (response) {
    const data = await response.json()
    const vehicle = vehicleNormalize(data)
    return fromJS(vehicle)
  }
  throw new Error('Couldnt update a vehicle by Id')
}

export {
  getAllVehicles,
  // createPriceHistory,
  deleteVehicleById,
  // deletePriceHistoryById,
  updateVehicleById,
  createVehicle
}
