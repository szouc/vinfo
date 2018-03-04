import express from 'express'

import * as Route from './routes'

import * as Controller from './controllers'

import { permitAccountant } from './permissions'

const accountRouter = express.Router()

accountRouter
  .route('/')
  .get(permitAccountant, Controller.getAllAccounts)

// Dynamic route should put the last position
accountRouter
  .route(Route.ACCOUNT_ID)
  .get(permitAccountant, Controller.getAccountById)
  .put(permitAccountant, Controller.updateAccountById)
  .delete(permitAccountant, Controller.deleteAccountById)

accountRouter.route(Route.ACCOUNT_STATUS)
  .put(permitAccountant, Controller.updateAccountStatusById)

export default accountRouter
