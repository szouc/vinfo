import express from 'express'

// import {
//   VEHICLE_DRIVER_ID_ROUTE,
//   VEHICLE_FUEL_ID_ROUTE,
//   VEHICLE_MAINTAIN_ID_ROUTE,
//   VEHICLE_DRIVER_ROUTE,
//   VEHICLE_FUEL_ROUTE,
//   VEHICLE_MAINTAIN_ROUTE,
//   VEHICLE_ID_ROUTE
// } from './routes'

import {
  // getAllVehicles,
  // getVehicleById,
  // updateVehicleById,
  // deleteVehicleById,
  // addVehicleFuel,
  // deleteVehicleFuel,
  // addVehicleMaintain,
  // deleteVehicleMaintain,
  // addVehicleDriver,
  // deleteVehicleDriver,
  createVehicle
} from './controllers'

import { permitManager } from './permissions'

const vehicleRouter = express.Router()

vehicleRouter
  .route('/')
  .post(permitManager, createVehicle)
//   .get(permitCaptain, getAllVehicles)

// // Dynamic route should put the last position
// vehicleRouter
//   .route(VEHICLE_ID_ROUTE)
//   .get(permitCaptain, getVehicleById)
//   .put(permitManager, updateVehicleById)
//   .delete(permitManager, deleteVehicleById)

// vehicleRouter
//   .route(VEHICLE_DRIVER_ROUTE)
//   .post(permitManager, addVehicleDriver)

// vehicleRouter
//   .route(VEHICLE_DRIVER_ID_ROUTE)
//   .delete(permitManager, deleteVehicleDriver)

// vehicleRouter
//   .route(VEHICLE_FUEL_ROUTE)
//   .post(permitManager, addVehicleFuel)

// vehicleRouter
//   .route(VEHICLE_FUEL_ID_ROUTE)
//   .delete(permitManager, deleteVehicleFuel)

// vehicleRouter
//   .route(VEHICLE_MAINTAIN_ROUTE)
//   .post(permitManager, addVehicleMaintain)

// vehicleRouter
//   .route(VEHICLE_MAINTAIN_ID_ROUTE)
//   .delete(permitManager, deleteVehicleMaintain)

export default vehicleRouter
