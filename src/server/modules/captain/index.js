import express from 'express'

import {
  // CAPTAIN_TRANSPORT_ID_ROUTE,
  CAPTAIN_FUEL_ID_ROUTE,
  CAPTAIN_MAINTAIN_ID_ROUTE,
  CAPTAIN_TRANSPORT_ROUTE,
  // CAPTAIN_FUEL_ROUTE,
  // CAPTAIN_MAINTAIN_ROUTE,
  CAPTAIN_VEHICLE_ROUTE,
  CAPTAIN_ID_ROUTE
} from './routes'

import {
  // addFuel,
  // deleteFuel,
  // getAllFuels,
  // getAllMaintains,
  // addTransport,
  // deleteTransport,
  // addMaintain,
  // deleteMaintain,
  // updateDriverByUsername,
  createTransport,
  checkFuelById,
  checkMaintainById,
  changePasswordByUsername,
  getAllVehiclesByUsername,
  getCaptainByUsername
} from './controllers'

import { isOwner, permitCaptain } from './permissions'

const captainRouter = express.Router()

// captainRouter
//   .route('/')

// Dynamic route should put the last position
captainRouter
  .route(CAPTAIN_ID_ROUTE)
  .all(isOwner, permitCaptain)
  .get(getCaptainByUsername)
  .put(changePasswordByUsername)

captainRouter
  .route(CAPTAIN_VEHICLE_ROUTE)
  .all(isOwner, permitCaptain)
  .get(getAllVehiclesByUsername)

// captainRouter
//   .route(CAPTAIN_FUEL_ROUTE)
//   .all(isOwner)
//   .get(getAllFuels)
//   .post(addFuel)

captainRouter
  .route(CAPTAIN_FUEL_ID_ROUTE)
  .all(isOwner)
  .put(checkFuelById)

// captainRouter
//   .route(CAPTAIN_MAINTAIN_ROUTE)
//   .all(isOwner)
//   .get(getAllMaintains)
//   .post(addMaintain)

captainRouter
  .route(CAPTAIN_MAINTAIN_ID_ROUTE)
  .all(isOwner)
  .put(checkMaintainById)

captainRouter
  .route(CAPTAIN_TRANSPORT_ROUTE)
  .all(isOwner)
  .post(createTransport)

// captainRouter
//   .route(CAPTAIN_TRANSPORT_ID_ROUTE)
//   .all(isOwner)
//   .put(checkMaintainById)

export default captainRouter
