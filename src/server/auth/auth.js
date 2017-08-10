import User from '../api/user/models/user'
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

const resetPassword = (req, res, next) => {
  debug('begin reset password')
  User.findByUsername(req.body.username, (err, user) => {
    if (err) {
      return next(err)
    }
    if (user) {
      user.setPassword(req.body.password, (err, user) => {
        if (err) {
          return next(err)
        }
        user.save()
          .then((user) => {
            res.json(user)
          })
          .catch((e) => {
            res.status(500).send('Couldnt reset the password at this time')
          })
      })
    }
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

export {
  userRegister,
  resetPassword,
  userLogin,
  userLogout,
  clientRoute,
  isAuthenticated
}
