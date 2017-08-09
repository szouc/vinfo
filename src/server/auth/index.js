import { clientRoute, userLogin, userLogout, userRegister } from './auth'

import express from 'express'

const authRouter = express.Router()

authRouter.route('/register')
  .post(userRegister)

authRouter.route('/login')
  .get(clientRoute)
  .post(userLogin)

authRouter.route('/logout')
  .get(userLogout)

export default authRouter
