import 'moment/locale/zh-cn'

import { configureStore, history } from './redux/store'

import BaseRoute from './route'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import React from 'react'
import { hot } from 'react-hot-loader'
import localforage from 'localforage'
import moment from 'moment'

const store = configureStore()

// 推荐在入口文件全局设置 locale
moment.locale('zh-cn')

// This will force localStorage as the storage
// driver even if another is available. You can
// use this instead of `setDriver()`.
localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'auth'
})

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BaseRoute />
    </ConnectedRouter>
  </Provider>
)

export default hot(module)(App)
