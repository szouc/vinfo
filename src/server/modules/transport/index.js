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

import { permitManager } from './permissions'

const transportRouter = express.Router()

transportRouter
  .route('/')
  .all(permitManager)
  .post(createTransport)
  .get(getAllTransports)

// Dynamic route should put the last position
transportRouter
  .route(TRANSPORT_ID_ROUTE)
  .all(permitManager)
  .get(getTransportById)
  .put(updateTransportById)
  .delete(deleteTransportById)

transportRouter
  .route(TRANSPORT_STATUS_ROUTE)
  .put(permitManager, updateTransportStatusById)

export default transportRouter
