import express from 'express'

import {
  // DRIVER_TRANSPORT_ID_ROUTE,
  // DRIVER_FUEL_ID_ROUTE,
  // DRIVER_MAINTAIN_ID_ROUTE,
  // DRIVER_TRANSPORT_ROUTE,
  DRIVER_FUEL_ROUTE,
  // DRIVER_MAINTAIN_ROUTE,
  DRIVER_ID_ROUTE
} from './routes'

import {
  addFuel,
  // deleteFuel,
  // addTransport,
  // deleteTransport,
  // addMaintain,
  // deleteMaintain,
  // updateDriverByUsername,
  changePasswordByUsername,
  getDriverByUsername
} from './controllers'

import { isOwner } from './permissions'

const driverRouter = express.Router()

// driverRouter
//   .route('/')

// Dynamic route should put the last position
driverRouter
  .route(DRIVER_ID_ROUTE)
  .all(isOwner)
  .get(getDriverByUsername)
  .put(changePasswordByUsername)

driverRouter
  .route(DRIVER_FUEL_ROUTE)
  .all(isOwner)
  .post(addFuel)

// driverRouter
//   .route(VEHICLE_FUEL_ID_ROUTE)
//   .delete(permitManager, deleteVehicleFuel)

// driverRouter
//   .route(VEHICLE_MAINTAIN_ROUTE)
//   .post(permitManager, addVehicleMaintain)

// driverRouter
//   .route(VEHICLE_MAINTAIN_ID_ROUTE)
//   .delete(permitManager, deleteVehicleMaintain)

export default driverRouter
