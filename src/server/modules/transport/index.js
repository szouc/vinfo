import express from 'express'

import * as Route from './routes'

import * as Controller from './controllers'

import { permitManager } from './permissions'

const transportRouter = express.Router()

transportRouter
  .route('/')
  .all(permitManager)
  .post(Controller.createTransport)
  .get(Controller.getTransportsWithPg)

transportRouter
  .route(Route.TRANSPORT_ALL)
  .all(permitManager)
  .get(Controller.getAllTransports)

transportRouter
  .route(Route.TRANSPORT_SHIPPING_PICTURE_UPLOAD)
  .post(
    permitManager,
    Controller.uploadShippingPic,
    Controller.getShippingPicUrl
  )

transportRouter
  .route(Route.TRANSPORT_OUTPUT_EXCEL)
  .get(permitManager, Controller.downloadExcel)

// Dynamic route should put the last position
transportRouter
  .route(Route.TRANSPORT_ID)
  .all(permitManager)
  .get(Controller.getTransportById)
  .put(Controller.updateTransportById)
  .delete(Controller.deleteTransportById)

transportRouter
  .route(Route.TRANSPORT_STATUS)
  .put(permitManager, Controller.updateTransportStatusById)

export default transportRouter
