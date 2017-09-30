import express from 'express'

import {
  // DRIVER_TRANSPORT_ID_ROUTE,
  DRIVER_FUEL_ID_ROUTE,
  DRIVER_MAINTAIN_ID_ROUTE,
  // DRIVER_TRANSPORT_ROUTE,
  DRIVER_FUEL_ROUTE,
  DRIVER_MAINTAIN_ROUTE,
  DRIVER_ID_ROUTE
} from './routes'

import {
  addFuel,
  deleteFuel,
  getAllFuels,
  getAllMaintains,
  // addTransport,
  // deleteTransport,
  addMaintain,
  deleteMaintain,
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
  .get(getAllFuels)
  .post(addFuel)

driverRouter
  .route(DRIVER_FUEL_ID_ROUTE)
  .all(isOwner)
  .delete(deleteFuel)

driverRouter
  .route(DRIVER_MAINTAIN_ROUTE)
  .all(isOwner)
  .get(getAllMaintains)
  .post(addMaintain)

driverRouter
  .route(DRIVER_MAINTAIN_ID_ROUTE)
  .all(isOwner)
  .delete(deleteMaintain)

export default driverRouter
