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

transportRouter
  .route(Route.TRANSPORT_SHIPPING_PICTURE_UPLOAD)
  .post(
    permitManager,
    Controller.uploadShippingPic,
    Controller.getShippingPicUrl
  )

export default transportRouter
