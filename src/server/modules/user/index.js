import express from 'express'

import {
  USER_ID_ROUTE,
  USER_ROLE_ROUTE,
  USER_LICENSE_UPLOAD_ROUTE,
  USER_ID_FRONT_UPLOAD_ROUTE,
  USER_ID_BACK_UPLOAD_ROUTE,
  USER_RESET_PASSWORD_ROUTE
} from './routes'

import {
  createUser,
  uploadUserLicense,
  updateUserByUsername,
  uploadUserIdFront,
  uploadUserIdBack,
  deleteUserByUsername,
  getAllUsers,
  getUsersByRole,
  getUserByUsername,
  resetPassword
} from './controllers'

import { permitManager } from './permissions'

import multer from 'multer'

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storageCreator = path => ({
  storage: multer.diskStorage({
    destination: `./dist/uploads/${path}`,
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

const licenseUploadPath = 'license'
const idFrontUploadPath = 'id_front'
const idBackUploadPath = 'id_back'
const licenseUpload = multer(storageCreator(licenseUploadPath))
const idFrontUpload = multer(storageCreator(idFrontUploadPath))
const idBackUpload = multer(storageCreator(idBackUploadPath))

const userRouter = express.Router()

userRouter
  .route('/')
  .all(permitManager)
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route(USER_ID_ROUTE)
  .all(permitManager)
  .get(getUserByUsername)
  .put(updateUserByUsername)
  .delete(deleteUserByUsername)

userRouter
  .route(USER_ROLE_ROUTE)
  .all(permitManager)
  .get(getUsersByRole)

userRouter
  .route(USER_LICENSE_UPLOAD_ROUTE)
  .post(permitManager, licenseUpload.single('license'), uploadUserLicense)

userRouter
  .route(USER_ID_FRONT_UPLOAD_ROUTE)
  .post(permitManager, idFrontUpload.single('id_front'), uploadUserIdFront)

userRouter
  .route(USER_ID_BACK_UPLOAD_ROUTE)
  .post(permitManager, idBackUpload.single('id_back'), uploadUserIdBack)

userRouter
  .route(USER_RESET_PASSWORD_ROUTE)
  .post(resetPassword)

export default userRouter
