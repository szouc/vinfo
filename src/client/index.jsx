// @flow

import { APP_CONTAINER_SELECTOR } from '../shared/config'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore, history } from './redux/store'

const store = configureStore()
const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const render = (Component) =>
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer>
          <Component />
        </AppContainer>
      </ConnectedRouter>
    </Provider>,
    rootEl
  )

render(App)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./App', () => render(App))
}
