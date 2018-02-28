import express from 'express'

import * as Route from './routes'

import * as Controller from './controllers'

import { permitManager } from './permissions'

const vehicleRouter = express.Router()

vehicleRouter
  .route('/')
  .all(permitManager)
  .post(Controller.createVehicle)
  .get(Controller.getVehiclesWithPg)

vehicleRouter
  .route(Route.VEHICLE_ALL)
  .all(permitManager)
  .get(Controller.getAllVehicles)

// Dynamic route should put the last position
vehicleRouter
  .route(Route.VEHICLE_ID)
  .all(permitManager)
  .get(Controller.getVehicleById)
  .put(Controller.updateVehicleById)
  .delete(Controller.deleteVehicleById)

vehicleRouter
  .route(Route.VEHICLE_FUEL)
  .post(permitManager, Controller.addVehicleFuel)

vehicleRouter
  .route(Route.VEHICLE_FUEL_ID)
  .delete(permitManager, Controller.deleteVehicleFuel)

vehicleRouter
  .route(Route.VEHICLE_MAINTAIN)
  .post(permitManager, Controller.addVehicleMaintain)

vehicleRouter
  .route(Route.VEHICLE_MAINTAIN_ID)
  .delete(permitManager, Controller.deleteVehicleMaintain)

export default vehicleRouter
