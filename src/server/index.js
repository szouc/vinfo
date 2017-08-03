// @flow

import compression from 'compression'
import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import logger from 'morgan'
import debugCreator from 'debug'

import conn from './config/conn'
import { APP_NAME, STATIC_PATH, WEB_PORT, SECRET_KEY } from '../shared/config'
import { isProd } from '../shared/utils'
import renderApp from './render-app'
import { helloEndpointRoute } from '../shared/routes'
import api from './api'

const app = express()
const debug = debugCreator('server')

app.use(compression())

// Use body-parser to get POST requests for API Use
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
const jsonBodyParser = bodyParser.json()

app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

// Log request to console
app.use(logger('dev'))

const payload = {
  username: 'sz',
  email: 'szouc@126.com'
}

const token = jwt.sign(payload, SECRET_KEY)

// app.get('/', (req, res) => {
//   res.json({ token })
// })

app.get('/', (req, res) => {
  res.set({
    'Authorization': `Bearer ${token}`
  })
  res.send(renderApp(APP_NAME))
})

app.get(helloEndpointRoute(), (req, res) => {
  debug(req.method + ' ' + req.url)
  res.json({ serverMessage: `Hello from the server! (received ${req.params.num})` })
})

app.use('/api', jsonBodyParser, api)

conn.getConnection()
  .once('open', listen)

function listen () {
  app.listen(WEB_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)'
      : '(development).\nKeep "yarn dev:express" running in an other terminal'}.`)
  })
}

// Error handling
