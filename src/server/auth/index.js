import express from 'express'

import * as Route from './routes'

import {
  resetPassword,
  userLogin,
  userLogout,
  userRegister,
  isLoggedIn
} from './controllers'

import { permitManager } from './permissions'

const authRouter = express.Router()

authRouter.route('/').get(isLoggedIn)

authRouter.route(Route.REGISTER).post(userRegister)

authRouter
  .route(Route.RESET_PASSWORD)
  .all(permitManager)
  .post(resetPassword)

authRouter.route(Route.LOGIN).post(userLogin)

authRouter.route(Route.LOGOUT).get(userLogout)

export default authRouter
