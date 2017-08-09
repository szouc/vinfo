import {
  GET_USER_BY_USERNAME_ROUTE,
  USER_RESET_PASSWORD_ROUTE
} from '../../../shared/routes'
import {
  createUser,
  deleteUserByUsername,
  getAllUser,
  getUserByUsername,
  resetPassword
} from './controllers/user'
import permit, { isOwner } from '../shared/permissions'

import { DRIVER_PERMISSIONS } from '../shared/config'
import express from 'express'

const userRouter = express.Router()

userRouter.route('/')
  .all(permit(DRIVER_PERMISSIONS))
  .get(getAllUser)
  .post(createUser)

userRouter.route(GET_USER_BY_USERNAME_ROUTE)
  .all(isOwner)
  .get(getUserByUsername)
  .delete(deleteUserByUsername)

userRouter.route(USER_RESET_PASSWORD_ROUTE)
  .all(isOwner)
  .post(resetPassword)

export default userRouter
