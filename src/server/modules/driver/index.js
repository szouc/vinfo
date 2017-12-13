import express from 'express'

import {
  DRIVER_VEHICLE_ROUTE,
  DRIVER_TRANSPORT_ID_ROUTE,
  DRIVER_FUEL_ID_ROUTE,
  DRIVER_MAINTAIN_ID_ROUTE,
  DRIVER_TRANSPORT_ROUTE,
  DRIVER_FUEL_ROUTE,
  DRIVER_MAINTAIN_ROUTE,
  DRIVER_ID_ROUTE
} from './routes'

import {
  addFuel,
  deleteFuel,
  getAllFuels,
  getAllMaintains,
  getAllDriverTransports,
  acceptTransportById,
  addMaintain,
  deleteMaintain,
  changePasswordByUsername,
  getVehicleByUsername,
  getDriverByUsername
} from './controllers'

import { isOwner } from './permissions'

const driverRouter = express.Router()

// all routes from the driver modules require 'isOwner' permission
// driverRouter
//   .all('*', isOwner)

// Dynamic route should put the last position
driverRouter
  .route(DRIVER_ID_ROUTE)
  .get(getDriverByUsername)
  .put(changePasswordByUsername)

driverRouter
  .route(DRIVER_VEHICLE_ROUTE)
  .get(getVehicleByUsername)

driverRouter
  .route(DRIVER_FUEL_ROUTE)
  .get(getAllFuels)
  .post(addFuel)

driverRouter
  .route(DRIVER_FUEL_ID_ROUTE)
  .delete(deleteFuel)

driverRouter
  .route(DRIVER_MAINTAIN_ROUTE)
  .get(getAllMaintains)
  .post(addMaintain)

driverRouter
  .route(DRIVER_MAINTAIN_ID_ROUTE)
  .delete(deleteMaintain)

driverRouter
  .route(DRIVER_TRANSPORT_ROUTE)
  .get(getAllDriverTransports)

driverRouter
  .route(DRIVER_TRANSPORT_ID_ROUTE)
  .put(acceptTransportById)

export default driverRouter
