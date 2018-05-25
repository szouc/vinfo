import { User } from '../modules/user/models'
import passport from 'passport'

const userRegister = (req, res, next) => {
  User.register(req.body, req.body.password, (err, user) => {
    if (err) {
      return next(err)
    }
    req.login(user, err => {
      if (err) {
        return next(err)
      }
      res.status(200).send('user registered ok')
    })
  })
}

const resetPassword = (req, res, next) => {
  User.findByUsername(req.body.username, (err, user) => {
    if (err) {
      return next(err)
    }
    if (user) {
      user.setPassword(req.body.password, (err, user) => {
        if (err) {
          return next(err)
        }
        user
          .save()
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
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      // res.status(401).send('Couldnt find the user')
      res.status(401).json(info)
    }
    if (user) {
      req.login(user, err => {
        if (err) {
          return next(err)
        }
        res
          .status(200)
          .send({ username: user.username, fullname: user.fullname })
      })
    }
  })(req, res, next)
}

const userLogout = (req, res) => {
  req.logout()
  res.status(200).send('user logged out')
}

// middleware for determining authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(403).send('请登录')
  }
}

const isLoggedIn = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send('User loggedIn')
  } else {
    res.status(403).send('Please Log in')
  }
}

export {
  userRegister,
  resetPassword,
  userLogin,
  userLogout,
  isAuthenticated,
  isLoggedIn
}
