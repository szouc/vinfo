import {
  RELATIVE_AUTH_LOGIN_ROUTE,
  RELATIVE_AUTH_LOGOUT_ROUTE,
  RELATIVE_AUTH_REGISTER_ROUTE,
  RELATIVE_AUTH_RESET_PASSWORD_ROUTE
} from '../../shared/routes'
import {
  resetPassword,
  userLogin,
  userLogout,
  userRegister
} from './auth'

import { MANAGER_PERMISSIONS } from '../api/shared/config'
import express from 'express'
import permit from '../api/shared/permissions'

const authRouter = express.Router()

authRouter.route(RELATIVE_AUTH_REGISTER_ROUTE)
  .post(userRegister)

authRouter.route(RELATIVE_AUTH_RESET_PASSWORD_ROUTE)
  .all(permit(MANAGER_PERMISSIONS))
  .post(resetPassword)

authRouter.route(RELATIVE_AUTH_LOGIN_ROUTE)
  .post(userLogin)

authRouter.route(RELATIVE_AUTH_LOGOUT_ROUTE)
  .get(userLogout)

export default authRouter
