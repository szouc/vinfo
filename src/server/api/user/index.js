import express from 'express'
import {
  getData,
  postData,
  getDataByLastName,
  deleteDataByLastName
} from './controllers/data-controller'

const userRouter = express.Router()

userRouter.route('/data')
  .get(getData)
  .post(postData)

userRouter.route('/data/:lastName')
  .get(getDataByLastName)
  .delete(deleteDataByLastName)

export default userRouter
