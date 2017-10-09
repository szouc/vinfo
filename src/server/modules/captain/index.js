import express from 'express'

import {
  CAPTAIN_TRANSPORT_ID_ROUTE,
  CAPTAIN_FUEL_ID_ROUTE,
  CAPTAIN_MAINTAIN_ID_ROUTE,
  CAPTAIN_TRANSPORT_ROUTE,
  CAPTAIN_VEHICLE_ROUTE,
  CAPTAIN_ID_ROUTE
} from './routes'

import {
  checkTransportById,
  createTransport,
  getAllCaptainTransports,
  checkFuelById,
  checkMaintainById,
  changePasswordByUsername,
  getAllCaptainVehicles,
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
  .get(getAllCaptainVehicles)

captainRouter
  .route(CAPTAIN_FUEL_ID_ROUTE)
  .all(isOwner, permitCaptain)
  .put(checkFuelById)

captainRouter
  .route(CAPTAIN_MAINTAIN_ID_ROUTE)
  .all(isOwner, permitCaptain)
  .put(checkMaintainById)

captainRouter
  .route(CAPTAIN_TRANSPORT_ROUTE)
  .all(isOwner, permitCaptain)
  .post(createTransport)
  .get(getAllCaptainTransports)

captainRouter
  .route(CAPTAIN_TRANSPORT_ID_ROUTE)
  .all(isOwner, permitCaptain)
  .put(checkTransportById)

export default captainRouter
