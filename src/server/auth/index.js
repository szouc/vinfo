import { clientRoute, registerUser, userLogout } from './auth'

import express from 'express'
import passport from 'passport'

const authRouter = express.Router()

authRouter.route('/register')
  .post(registerUser)
authRouter.route('/login')
  .get(clientRoute)
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }))
authRouter.route('/logout')
  .get(userLogout)

export default authRouter
