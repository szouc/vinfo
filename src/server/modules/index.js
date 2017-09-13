import { USER_ROOT_ROUTE } from './user/routes'
import { COMPANY_ROOT_ROUTE } from './company/routes'
import { PRODUCT_ROOT_ROUTE } from './product/routes'
import { VEHICLE_ROOT_ROUTE } from './vehicle/routes'
import express from 'express'
import user from './user'
import company from './company'
import product from './product'
import vehicle from './vehicle'

const apiRouter = express.Router()

apiRouter.use(USER_ROOT_ROUTE, user)
apiRouter.use(COMPANY_ROOT_ROUTE, company)
apiRouter.use(PRODUCT_ROOT_ROUTE, product)
apiRouter.use(VEHICLE_ROOT_ROUTE, vehicle)

export default apiRouter
