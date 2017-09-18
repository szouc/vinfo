import express from 'express'

import {
  USER_ID_ROUTE,
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

userRouter.route(USER_ID_ROUTE)
  .get(isOwner, getUserByUsername)
  .delete(permitManager, deleteUserByUsername)

userRouter.route(USER_RESET_PASSWORD_ROUTE)
  .all(isOwner)
  .post(resetPassword)

export default userRouter
