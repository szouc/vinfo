import express from 'express'

import * as Route from './routes'
import * as Controller from './controllers'

import { permitManager } from './permissions'

const userRouter = express.Router()

userRouter
  .route('/')
  .all(permitManager)
  .get(Controller.getUsersWithPg)
  .post(Controller.createUser)

userRouter
  .route(Route.USER_ALL)
  .all(permitManager)
  .get(Controller.getAllUsers)

userRouter
  .route(Route.USER_ID)
  .all(permitManager)
  .get(Controller.getUserByUsername)
  .put(Controller.updateUserByUsername)
  .delete(Controller.deleteUserByUsername)

// userRouter
//   .route(Route.USER_ROLE)
//   .all(permitManager)
//   .get(Controller.getUsersByRoleWithPg)

userRouter
  .route(Route.USER_LICENSE_UPLOAD)
  .post(permitManager, Controller.uploadLicense, Controller.getLicenseUrl)

userRouter
  .route(Route.USER_ID_FRONT_UPLOAD)
  .post(permitManager, Controller.uploadIdFront, Controller.getIdFrontUrl)

userRouter
  .route(Route.USER_ID_BACK_UPLOAD)
  .post(permitManager, Controller.uploadIdBack, Controller.getIdBackUrl)

userRouter
  .route(Route.USER_RESET_PASSWORD)
  .post(permitManager, Controller.resetPassword)

export default userRouter
