import express from 'express'

import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE
} from './routes'

import {
  resetPassword,
  userLogin,
  userLogout,
  userRegister,
  isLoggedIn
} from './controllers'

import { permitManager } from './permissions'

const authRouter = express.Router()

authRouter.route('/')
  .get(isLoggedIn)

authRouter.route(REGISTER_ROUTE)
  .post(userRegister)

authRouter.route(RESET_PASSWORD_ROUTE)
  .all(permitManager)
  .post(resetPassword)

authRouter.route(LOGIN_ROUTE)
  .post(userLogin)

authRouter.route(LOGOUT_ROUTE)
  .get(userLogout)

export default authRouter
