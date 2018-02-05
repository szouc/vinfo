import express from 'express'

import * as Route from './routes'

import * as Controller from './controllers'

import { isOwner } from './permissions'

const driverRouter = express.Router()

// Dynamic route should put the last position
driverRouter
  .route(Route.DRIVER_ID)
  .all(isOwner)
  .get(Controller.getDriverByUsername)
  .put(Controller.changePasswordByUsername)

driverRouter
  .route(Route.DRIVER_VEHICLE)
  .all(isOwner)
  .get(Controller.getVehicleByUsername)

driverRouter
  .route(Route.DRIVER_FUEL)
  .all(isOwner)
  .get(Controller.getAllFuels)
  .post(Controller.addFuel)

driverRouter
  .route(Route.DRIVER_FUEL_ID)
  .all(isOwner)
  .delete(Controller.deleteFuel)

driverRouter
  .route(Route.DRIVER_MAINTAIN)
  .all(isOwner)
  .get(Controller.getAllMaintains)
  .post(Controller.addMaintain)

driverRouter
  .route(Route.DRIVER_MAINTAIN_ID)
  .all(isOwner)
  .delete(Controller.deleteMaintain)

driverRouter
  .route(Route.DRIVER_TRANSPORT)
  .all(isOwner)
  .get(Controller.getDriverTransports)

driverRouter
  .route(Route.DRIVER_TRANSPORT_ID)
  .all(isOwner)
  .put(Controller.acceptTransportById)

export default driverRouter
