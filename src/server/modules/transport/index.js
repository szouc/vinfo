import express from 'express'

import {
  TRANSPORT_ID_ROUTE,
  TRANSPORT_STATUS_ROUTE
} from './routes'

import {
  getAllTransports,
  getTransportById,
  updateTransportById,
  updateTransportStatusById,
  deleteTransportById,
  createTransport
} from './controllers'

import { permitCaptain } from './permissions'

const transportRouter = express.Router()

transportRouter
  .route('/')
  .post(permitCaptain, createTransport)
  .get(permitCaptain, getAllTransports)

// Dynamic route should put the last position
transportRouter
  .route(TRANSPORT_ID_ROUTE)
  .get(permitCaptain, getTransportById)
  .put(permitCaptain, updateTransportById)
  .delete(permitCaptain, deleteTransportById)

transportRouter
  .route(TRANSPORT_STATUS_ROUTE)
  .put(updateTransportStatusById)

export default transportRouter
