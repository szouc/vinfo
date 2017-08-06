import {
  createUser,
  deleteUserByUsername,
  getAllUser,
  getUserByUsername
} from './controllers/user'
import permit, { isOwner } from '../shared/permissions'

import { DRIVER_PERMISSIONS } from '../shared/config'
import express from 'express'

const userRouter = express.Router()

userRouter.route('/')
  .all(permit(DRIVER_PERMISSIONS))
  .get(getAllUser)
  .post(createUser)

userRouter.route('/:username')
  .all(isOwner)
  .get(getUserByUsername)
  .delete(deleteUserByUsername)

export default userRouter
