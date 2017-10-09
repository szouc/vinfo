import { USER_ROOT_ROUTE } from './user/routes'
import { COMPANY_ROOT_ROUTE } from './company/routes'
import { PRODUCT_ROOT_ROUTE } from './product/routes'
import { VEHICLE_ROOT_ROUTE } from './vehicle/routes'
import { TRANSPORT_ROOT_ROUTE } from './transport/routes'
import { ACCOUNT_ROOT_ROUTE } from './account/routes'
import { DRIVER_ROOT_ROUTE } from './driver/routes'
import { CAPTAIN_ROOT_ROUTE } from './captain/routes'
import express from 'express'
import user from './user'
import company from './company'
import product from './product'
import vehicle from './vehicle'
import transport from './transport'
import account from './account'
import driver from './driver'
import captain from './captain'

const apiRouter = express.Router()

apiRouter.use(USER_ROOT_ROUTE, user)
apiRouter.use(COMPANY_ROOT_ROUTE, company)
apiRouter.use(PRODUCT_ROOT_ROUTE, product)
apiRouter.use(VEHICLE_ROOT_ROUTE, vehicle)
apiRouter.use(TRANSPORT_ROOT_ROUTE, transport)
apiRouter.use(ACCOUNT_ROOT_ROUTE, account)
apiRouter.use(DRIVER_ROOT_ROUTE, driver)
apiRouter.use(CAPTAIN_ROOT_ROUTE, captain)

export default apiRouter
