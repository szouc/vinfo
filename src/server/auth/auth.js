import { User } from '../api/shared/models'
import debugCreator from 'debug'

const debug = debugCreator('auth')

const registerUser = (req, res, next) => {
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

// Use passport.authenticate('local') instead of

// export const userLogin = (req, res, next) => {
//   debug('begin login')
//   User.authenticate()(req.body.username, req.body.password, (err, user) => {
//     if (err) {
//       return next(err)
//     }
//     req.login(user, (err) => {
//       if (err) {
//         return next(err)
//       }
//       debug('login finish ' + req.user)
//       res.json(req.user)
//     })
//   })
// }

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

export { registerUser, userLogout, clientRoute, isAuthenticated }
