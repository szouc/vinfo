import express from 'express'
import user from './user'
import jwtMiddleware from 'express-jwt'
import { SECRET_KEY } from '../../shared/config'

const apiRouter = express.Router()

// JWT Middleware

apiRouter.use(
  jwtMiddleware({secret: SECRET_KEY})
)

apiRouter.use(
  jwtMiddleware({
    secret: SECRET_KEY,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
      } else if (req.query && req.query.token) {
        return req.query.token
      }
      return null
    }
  })
)

apiRouter.use('/user', user)

// JWT Error handling

apiRouter.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token')
  } else {
    next(err)
  }
})

export default apiRouter
