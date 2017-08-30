// @flow

import { compose, applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import Immutable from 'immutable'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga/lib/internal/middleware'
import { isProd } from '../../shared/utils'
import rootReducer from './reducer'
import rootSagas from './saga'
import type { fromJS as Immut } from 'immutable'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import localforge from 'localforage'

export const history = createHistory()
const browserRouterMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
  stateTransformer: state => ({ ...state.toJS() })
})

const middleware = [sagaMiddleware, browserRouterMiddleware, logger]

const devtool = isProd
  ? undefined
  : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const initialState: Immut = Immutable.fromJS(devtool)

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware), autoRehydrate())
)

sagaMiddleware.run(rootSagas)
persistStore(store, {
  storage: localforge
})

export default store
