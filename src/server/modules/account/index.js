import express from 'express'

import {
  ACCOUNT_STATUS_ROUTE,
  ACCOUNT_ID_ROUTE
} from './routes'

import {
  getAccountById,
  updateAccountById,
  updateAccountStatusById,
  deleteAccountById,
  getAllAccounts
} from './controllers'

import { permitAccountant } from './permissions'

const accountRouter = express.Router()

accountRouter
  .route('/')
  .get(permitAccountant, getAllAccounts)

// Dynamic route should put the last position
accountRouter
  .route(ACCOUNT_ID_ROUTE)
  .get(permitAccountant, getAccountById)
  .put(permitAccountant, updateAccountById)
  .delete(permitAccountant, deleteAccountById)

accountRouter.route(ACCOUNT_STATUS_ROUTE)
  .put(permitAccountant, updateAccountStatusById)

export default accountRouter
