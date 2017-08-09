// @flow

import 'babel-polyfill'

import { applyMiddleware, combineReducers, createStore } from 'redux'

import { APP_CONTAINER_SELECTOR } from '../shared/config'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga/lib/internal/middleware'
import { reducer as formReducer } from 'redux-form'
import helloReducer from './reducer/hello'
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

const rootReducer = combineReducers({
  hello: helloReducer,
  form: formReducer
})

const store = createStore(
  rootReducer,
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
