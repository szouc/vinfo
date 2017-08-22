// @flow

import { APP_CONTAINER_SELECTOR } from '../shared/config'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import store, { history } from './redux/store'

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const render = (Component, reduxStore) =>
  ReactDOM.render(
    <Provider store={reduxStore}>
      <ConnectedRouter history={history}>
        <AppContainer>
          <Component />
        </AppContainer>
      </ConnectedRouter>
    </Provider>,
    rootEl
  )

render(App, store)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./App', () => render(App, store))
}
