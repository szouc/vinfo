import {
  AUTH_LOGIN_ROUTE,
  AUTH_LOGOUT_ROUTE,
  AUTH_REGISTER_ROUTE,
  AUTH_RESET_PASSWORD_ROUTE
} from '../../shared/routes'
import {
  clientRoute,
  resetPassword,
  userLogin,
  userLogout,
  userRegister
} from './auth'

import { MANAGER_PERMISSIONS } from '../api/shared/config'
import express from 'express'
import permit from '../api/shared/permissions'

const authRouter = express.Router()

authRouter.route(AUTH_REGISTER_ROUTE)
  .post(userRegister)

authRouter.route(AUTH_RESET_PASSWORD_ROUTE)
  .all(permit(MANAGER_PERMISSIONS))
  .post(resetPassword)

authRouter.route(AUTH_LOGIN_ROUTE)
  .get(clientRoute)
  .post(userLogin)

authRouter.route(AUTH_LOGOUT_ROUTE)
  .get(userLogout)

export default authRouter
