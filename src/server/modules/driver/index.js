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
  .get(Controller.getDriverVehicles)

driverRouter
  .route(Route.DRIVER_FUEL)
  .all(isOwner)
  .get(Controller.getVehicleFuels)
  .post(Controller.addVehicleFuel)

driverRouter
  .route(Route.DRIVER_FUEL_ID)
  .all(isOwner)
  .delete(Controller.deleteVehicleFuel)

driverRouter
  .route(Route.DRIVER_MAINTAIN)
  .all(isOwner)
  .get(Controller.getVehicleMaintains)
  .post(Controller.addVehicleMaintain)

driverRouter
  .route(Route.DRIVER_MAINTAIN_ID)
  .all(isOwner)
  .delete(Controller.deleteVehicleMaintain)

driverRouter
  .route(Route.DRIVER_TRANSPORT)
  .all(isOwner)
  .get(Controller.getDriverTransports)

driverRouter
  .route(Route.DRIVER_TRANSPORT_STATUS)
  .all(isOwner)
  .get(Controller.getStatusTransports)

driverRouter
  .route(Route.DRIVER_TRANSPORT_ID)
  .all(isOwner)
  .put(Controller.updateTransport)

driverRouter
  .route(Route.DRIVER_TRANSPORT_ID_STATUS)
  .all(isOwner)
  .put(Controller.updateTransportStatus)

export default driverRouter
