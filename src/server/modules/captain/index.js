import express from 'express'

import * as Route from './routes'

import * as Controller from './controllers'

import { isOwner, permitCaptain } from './permissions'

const captainRouter = express.Router()

// captainRouter
//   .route('/')

// Dynamic route should put the last position
captainRouter
  .route(Route.CAPTAIN_ID)
  .all(isOwner, permitCaptain)
  .get(Controller.getCaptainByUsername)
  .put(Controller.changePasswordByUsername)

captainRouter
  .route(Route.CAPTAIN_VEHICLE)
  .all(isOwner, permitCaptain)
  .get(Controller.getCaptainVehicles)

captainRouter
  .route(Route.CAPTAIN_COMPANY)
  .all(isOwner, permitCaptain)
  .get(Controller.getCaptainCompanies)

captainRouter
  .route(Route.CAPTAIN_PRODUCT)
  .all(isOwner, permitCaptain)
  .get(Controller.getCaptainProducts)

captainRouter
  .route(Route.CAPTAIN_FUEL_ID)
  .all(isOwner, permitCaptain)
  .put(Controller.checkFuelById)

captainRouter
  .route(Route.CAPTAIN_MAINTAIN_ID)
  .all(isOwner, permitCaptain)
  .put(Controller.checkMaintainById)

captainRouter
  .route(Route.CAPTAIN_TRANSPORT)
  .all(isOwner, permitCaptain)
  .post(Controller.createTransport)
  .get(Controller.getCaptainTransports)

captainRouter
  .route(Route.CAPTAIN_TRANSPORT_ID)
  .all(isOwner, permitCaptain)
  .put(Controller.checkTransportById)

export default captainRouter
