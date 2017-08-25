import { User } from '../modules/user/models'
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
    req.login(user, err => {
      if (err) {
        return next(err)
      }
      debug('user login')
      res.status(200).send('user registered ok')
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
          .then(user => {
            res.status(200).json(user)
          })
          .catch(() => {
            res.status(500).send('Couldnt reset the password at this time')
          })
      })
    }
  })
}

const userLogin = (req, res, next) => {
  debug('login begin')
  debug(req.body)
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      // res.status(401).send('Couldnt find the user')
      res.status(401).json(info)
    }
    // if (user) {
    req.login(user, err => {
      if (err) {
        return next(err)
      }
      res.status(200).send('user logged in')
    })
    // }
  })(req, res, next)
}

// const userLogin = passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/auth/login',
//   failureFlash: true
// })

const userLogout = (req, res) => {
  debug('begin logout')
  req.logout()
  res.status(200).send('user logged out')
}

// middleware for determining authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send('请登录')
  }
}

export { userRegister, resetPassword, userLogin, userLogout, isAuthenticated }
