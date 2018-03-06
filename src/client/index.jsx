// @flow

import { APP_CONTAINER_SELECTOR } from '../shared/config'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

ReactDOM.render(<App />, rootEl)
