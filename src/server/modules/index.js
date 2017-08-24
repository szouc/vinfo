import { USER_ROOT_ROUTE } from './user/routes'
import express from 'express'
import user from './user'

const apiRouter = express.Router()

apiRouter.use(USER_ROOT_ROUTE, user)

export default apiRouter
