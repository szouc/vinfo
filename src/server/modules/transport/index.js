import express from 'express'

// import {
//   TRANSPORT_ID_ROUTE
// } from './routes'

import {
  // getAllTransports,
  // getTransportById,
  // updateTransportById,
  // deleteTransportById,
  createTransport
} from './controllers'

import { permitCaptain } from './permissions'

const transportRouter = express.Router()

transportRouter
  .route('/')
  .post(permitCaptain, createTransport)
  // .get(permitCaptain, getAllTransports)

// Dynamic route should put the last position
// transportRouter
//   .route(TRANSPORT_ID_ROUTE)
//   .get(permitCaptain, getTransportById)
//   .put(permitManager, updateTransportById)
//   .delete(permitManager, deleteTransportById)

export default transportRouter
