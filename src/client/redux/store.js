// @flow

import { compose, applyMiddleware, createStore } from 'redux'
// react-router
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// redux-logger middleware
import { createLogger } from 'redux-logger'
// redux-saga middleware
import createSagaMiddleware from 'redux-saga/lib/internal/middleware'
// root of Reducer
import rootReducer from './reducer'
// root of Saga
import rootSagas from './saga'
import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'
import { isProd } from '@shared/utils'
// import { persistStore, autoRehydrate } from 'redux-persist-immutable'
// import localforage from 'localforage'

/**
 * Middlewares:
 * react router middleware
 * redux Saga middleware
 * redux-logger middleware
 */
export const history = createHistory()
const browserRouterMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
  stateTransformer: state => ({ ...state.toJS() })
})

const middleware = [sagaMiddleware, browserRouterMiddleware, logger]

// with Redux Debug tools
const devtool = isProd
  ? undefined
  : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const initialState: Immut = Immutable.fromJS(devtool)
// const enhancer = compose(applyMiddleware(...middleware), autoRehydrate())
const enhancer = compose(applyMiddleware(...middleware))

export const configureStore = (state: Immut = initialState) => {
  const store = createStore(rootReducer, state, enhancer)

  if (module.hot) {
    // flow-disable-next-line
    module.hot.accept('./reducer', () => {
      store.replaceReducer(rootReducer)
    })
  }

  sagaMiddleware.run(rootSagas)
  // persistStore(store, {
  //   storage: localforage
  // })

  return store
}

export default configureStore
