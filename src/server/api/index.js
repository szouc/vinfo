import { USER_API_ROOT_ROUTE } from '../../shared/routes'
import express from 'express'
import user from './user'

const apiRouter = express.Router()

apiRouter.use(USER_API_ROOT_ROUTE, user)

export default apiRouter
