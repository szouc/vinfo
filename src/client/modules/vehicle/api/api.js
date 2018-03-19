// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
// import { replaceAll } from '@clientUtils/replaceAll'
import * as Request from './request'

import { vehicleArrayNormalize, vehicleNormalize } from '@clientSettings/schema'

const STATUS_OK = 200

async function createVehicle(payload: Immut): ?Immut {
  const response = await Request.createVehicle(payload)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const vehicle = vehicleNormalize(data)
    return fromJS(vehicle)
  }
  throw new Error('Couldnt create a new vehicle')
}

async function getAllVehicles(): ?Immut {
  const response = await Request.getAllVehicles()
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const vehicles = vehicleArrayNormalize(data)
    return fromJS(vehicles)
  }
  throw new Error('Something wrong at getAllVehicles Process')
}

async function getVehiclesWithPg(payload: {
  pageNumber: Number,
  pageSize: Number,
  fromDate: String,
  toDate: String
}): ?Immut {
  const response = await Request.getVehiclesWithPg(
    payload.pageNumber,
    payload.pageSize,
    payload.fromDate,
    payload.toDate
  )
  if (response.status === STATUS_OK) {
    const { result, pagination } = response.data
    const vehicles = vehicleArrayNormalize(result)
    return fromJS({ vehicle: vehicles, pagination })
  }
  throw new Error('Something wrong at getVehiclesWithPg process')
}

async function deleteVehicleById(id: string) {
  const response = await Request.deleteVehicleById(id)
  if (response.status === STATUS_OK) {
    return fromJS({ id: id })
  }
  throw new Error('Something wrong at deleteVehicleById Process')
}

async function updateVehicleById(payload: Immut) {
  const vehicleId = payload.get('vehicleId')
  const update = payload.get('values')
  const response = await Request.updateVehicleById(vehicleId, update)
  if (response) {
    const data = response.data.result
    const vehicle = vehicleNormalize(data)
    return fromJS(vehicle)
  }
  throw new Error('Couldnt update a vehicle by Id')
}

async function createVehicleFuel(payload: Immut): ?Immut {
  const vehicleId = payload.get('vehicleId')
  const fuel = payload.getIn(['values', 'fuels'])
  const response = await Request.createVehicleFuel(vehicleId, fuel)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const vehicle = vehicleNormalize(data)
    return fromJS(vehicle)
  }
  throw new Error('Couldnt create a new fuel')
}

async function createVehicleMaintain(payload: Immut): ?Immut {
  const vehicleId = payload.get('vehicleId')
  const maintain = payload.getIn(['values', 'maintain'])
  const response = await Request.createVehicleMaintain(vehicleId, maintain)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const vehicle = vehicleNormalize(data)
    return fromJS(vehicle)
  }
  throw new Error('Couldnt create a new maintain')
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

export {
  getAllVehicles,
  getVehiclesWithPg,
  deleteVehicleById,
  createVehicleFuel,
  createVehicleMaintain,
  // deletePriceHistoryById,
  updateVehicleById,
  createVehicle
}
