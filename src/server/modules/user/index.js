import express from 'express'

import {
  USER_ID_ROUTE,
  USER_LICENSE_UPLOAD_ROUTE,
  USER_RESET_PASSWORD_ROUTE
} from './routes'

import {
  createUser,
  uploadUserLicense,
  deleteUserByUsername,
  getAllUser,
  getUserByUsername,
  resetPassword
} from './controllers'

import { permitManager, isOwner } from './permissions'

import multer from 'multer'

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './dist/uploads/license',
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

const userRouter = express.Router()

userRouter
  .route('/')
  .all(permitManager)
  .get(getAllUser)
  .post(createUser)

userRouter
  .route(USER_ID_ROUTE)
  .get(isOwner, getUserByUsername)
  .delete(permitManager, deleteUserByUsername)

userRouter
  .route(USER_LICENSE_UPLOAD_ROUTE)
  .post(permitManager, upload.single('license'), uploadUserLicense)

userRouter
  .route(USER_RESET_PASSWORD_ROUTE)
  .all(isOwner)
  .post(resetPassword)

export default userRouter
