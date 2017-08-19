// @flow

import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import Immutable from 'immutable'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga/lib/internal/middleware'
import { isProd } from '../../shared/utils'
import rootReducer from './reducer'
import rootSagas from './saga'

const history = createHistory()
const browserRouterMiddleware = routerMiddleware(history)
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

const middleware = [ sagaMiddleware, browserRouterMiddleware, logger ]

export default createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  isProd
    ? undefined
    : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)

sagaMiddleware.run(rootSagas)
