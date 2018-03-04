import { USER_ROOT } from './user/routes'
import { COMPANY_ROOT } from './company/routes'
import { PRODUCT_ROOT } from './product/routes'
import { VEHICLE_ROOT } from './vehicle/routes'
import { TRANSPORT_ROOT } from './transport/routes'
import { ACCOUNT_ROOT } from './account/routes'
import { DRIVER_ROOT } from './driver/routes'
import { CAPTAIN_ROOT } from './captain/routes'
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

apiRouter.use(USER_ROOT, user)
apiRouter.use(COMPANY_ROOT, company)
apiRouter.use(PRODUCT_ROOT, product)
apiRouter.use(VEHICLE_ROOT, vehicle)
apiRouter.use(TRANSPORT_ROOT, transport)
apiRouter.use(ACCOUNT_ROOT, account)
apiRouter.use(DRIVER_ROOT, driver)
apiRouter.use(CAPTAIN_ROOT, captain)

export default apiRouter
