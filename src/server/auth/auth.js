import { User } from '../api/shared/models'
import debugCreator from 'debug'
import passport from 'passport'

const debug = debugCreator('auth')

const userRegister = (req, res, next) => {
  debug('begin register')
  User.register(req.body, req.body.password, (err, user) => {
    if (err) {
      debug('error register')
      return next(err)
    }
    debug('user registered' + user)
    req.login(user, (err) => {
      if (err) {
        return next(err)
      }
      debug('user login')
      res.json(req.user)
    })
  })
}

const userLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
})

const userLogout = (req, res) => {
  debug('begin logout')
  req.logout()
  res.redirect('/auth/login')
}

// for debug
const clientRoute = (req, res) => {
  res.send(`Client will render the Login page. ${req.flash('error')}`)
}

// middleware for determining authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

export { userRegister, userLogin, userLogout, clientRoute, isAuthenticated }
