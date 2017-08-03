// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga/lib/internal/middleware'
import { BrowserRouter } from 'react-router-dom'
import { createLogger } from 'redux-logger'
import Immutable from 'immutable'

import App from './App'
import helloReducer from './reducer/hello'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/utils'
import watchRequestHello from './saga/hello'

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
  stateTransformer: (state) => {
    let newState = {}

    for (var i of Object.keys(state)) {
      // flow-disable-next-line
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS()
      } else {
        newState[i] = state[i]
      }
    };

    return newState
  }
})

const store = createStore(
  combineReducers({ hello: helloReducer }),
  // eslint-disable-next-line no-underscore-dangle
  isProd
    ? undefined
    : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(watchRequestHello)

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const render = (Component, reduxStore) =>
  ReactDOM.render(
    <Provider store={reduxStore}>
      <BrowserRouter>
        <AppContainer>
          <Component />
        </AppContainer>
      </BrowserRouter>
    </Provider>,
    rootEl
  )

render(App, store)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./App', () => render(App, store))
}
