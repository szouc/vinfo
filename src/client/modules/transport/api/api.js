// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
// import { replaceAll } from '@clientUtils/replaceAll'
import * as Request from './request'

import {
  transportArrayNormalize,
  transportNormalize
} from '@clientSettings/schema'

const STATUS_OK = 200

async function createTransport(payload: Immut): ?Immut {
  const response = await Request.createTransport(payload)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const transport = transportNormalize(data[0])
    return fromJS(transport)
  }
  throw new Error('Couldnt create a new transport')
}

async function getAllTransports(): ?Immut {
  const response = await Request.getAllTransports()
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const transports = transportArrayNormalize(data)
    return fromJS(transports)
  }
  throw new Error('Something wrong in getAllTransports Process.')
}

async function getTransportsWithPg(payload: {
  pageNumber: Number,
  pageSize: Number,
  fromDate: String,
  toDate: String
}): ?Immut {
  const response = await Request.getTransportsWithPg(
    payload.pageNumber,
    payload.pageSize,
    payload.fromDate,
    payload.toDate
  )
  if (response.status === STATUS_OK) {
    const { result, pagination } = response.data
    const transport = transportArrayNormalize(result)
    return fromJS({ transport, pagination })
  }
  throw new Error('Something wrong in getTransportsWithPg Process.')
}
// async function getAllVehicles(): ?Immut {
//   const options = {
//     method: 'get'
//   }
//   const response = await fetch(VEHICLE_ROOT_API, options)
//   if (response.status === STATUS_OK) {
//     const data = await response.json()
//     const vehicles = vehicleArrayNormalize(data)
//     return fromJS(vehicles)
//   }
//   throw new Error('Something wrong at getAllVehicles Process')
// }

// async function deleteVehicleById(id: string) {
//   const options = {
//     method: 'delete'
//   }
//   const response = await fetch(VEHICLE_ID_API.replace(/:id/, id), options)
//   if (response.status === STATUS_OK) {
//     return id
//   }
//   throw new Error('Something wrong at deleteVehicleById Process')
// }

// async function updateVehicleById(payload: Immut) {
//   const options = {
//     method: 'put',
//     body: JSON.stringify(payload.get('values')),
//     headers: { 'Content-Type': 'application/json' }
//   }
//   const response = await fetch(VEHICLE_ID_API.replace(/:id/, payload.get('vehicleId')), options)
//   if (response) {
//     const data = await response.json()
//     const vehicle = vehicleNormalize(data)
//     return fromJS(vehicle)
//   }
//   throw new Error('Couldnt update a vehicle by Id')
// }

// async function createVehicleFuel(payload: Immut): ?Immut {
//   const vehicleId = payload.get('vehicleId')
//   const options = {
//     method: 'post',
//     body: JSON.stringify(payload.getIn(['values', 'fuels'])),
//     headers: { 'Content-Type': 'application/json' }
//   }
//   const response = await fetch(
//     VEHICLE_FUEL_API.replace(/:id/, vehicleId),
//     options
//   )
//   if (response.status === STATUS_OK) {
//     const data = await response.json()
//     const vehicle = vehicleNormalize(data)
//     return fromJS(vehicle)
//   }
//   throw new Error('Couldnt create a new fuel')
// }

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

export { createTransport, getAllTransports, getTransportsWithPg }
