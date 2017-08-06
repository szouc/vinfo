// @flow

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config'

import LocalStrategy from 'passport-local'
import Redis from 'connect-redis'
import { SESSION_SECRET_KEY } from './config/settings'
import User from './api/user/models/user'
import api from './api'
import auth from './auth'
import bodyParser from 'body-parser'
import compression from 'compression'
import conn from './config/conn'
import debugCreator from 'debug'
import express from 'express'
import flash from 'connect-flash'
import { helloEndpointRoute } from '../shared/routes'
import { isAuthenticated } from './auth/auth'
import { isProd } from '../shared/utils'
import logger from 'morgan'
import passport from 'passport'
import renderApp from './render-app'
import session from 'express-session'

const app = express()
const debug = debugCreator('server')
const RedisStore = Redis(session)

app.set('env', isProd ? 'production' : 'development')

app.use(compression())

// Use body-parser to get POST requests for API Use
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  store: new RedisStore({host: '127.0.0.1', port: 6379}),
  secret: SESSION_SECRET_KEY,
  name: 'user_sess',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  }
}))

app.use(flash())

// Configurations for passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

// Log request to console
app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send(renderApp(APP_NAME))
})

app.get(helloEndpointRoute(), (req, res) => {
  debug(req.method + ' ' + req.url)
  res.json({ serverMessage: `Hello from the server! (received ${req.params.num})` })
})

app.use('/auth', auth)

app.use('/api', isAuthenticated, api)

conn.getConnection()
  .once('open', listen)

function listen () {
  app.listen(WEB_PORT, () => {
    // eslint-disable-next-line no-console
    debug(app.get('env'))
    console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)'
      : '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
  })
}

// Error handling

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  // flow-disable-next-line
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {}
  debug(res.locals.error)
  // render the error page
  res.status(err.status || 500)
  res.end('error')
})
