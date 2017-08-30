import express from 'express'

import {
  GET_USER_BY_USERNAME_ROUTE,
  USER_RESET_PASSWORD_ROUTE
} from './routes'

import {
  createUser,
  deleteUserByUsername,
  getAllUser,
  getUserByUsername,
  resetPassword
} from './controllers'

import { permitManager, isOwner } from './permissions'

const userRouter = express.Router()

userRouter.route('/')
  .all(permitManager)
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
