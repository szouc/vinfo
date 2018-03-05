import express from 'express'

import * as Route from './routes'

import * as Controller from './controllers'

import { permitAccountant } from './permissions'

const accountRouter = express.Router()

accountRouter
  .route(Route.ACCOUNT_TRANSPORT)
  .get(permitAccountant, Controller.getAllTransports)

// Dynamic route should put the last position
accountRouter
  .route(Route.ACCOUNT_TRANSPORT_ID)
  .get(permitAccountant, Controller.getAccountById)
  .delete(permitAccountant, Controller.deleteAccountById)
  .put(permitAccountant, Controller.updateAccountStatusById)

// accountRouter.route(Route.ACCOUNT_STATUS)

export default accountRouter
