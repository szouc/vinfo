import { RELATIVE_API_USER_ROOT_ROUTE } from '../../shared/routes'
import express from 'express'
import user from './user'

const apiRouter = express.Router()

apiRouter.use(RELATIVE_API_USER_ROOT_ROUTE, user)

export default apiRouter
