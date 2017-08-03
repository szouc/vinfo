// @flow

import React from 'react'
import Loadable from 'react-loadable'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import { APP_NAME } from '../shared/config'
import Nav from './component/nav'
import HomePage from './component/page/home'
// import HelloPage from './component/page/hello'
// import HelloAsyncPage from './component/page/hello-async'
import NotFoundPage from './component/page/not-found'
// import RegisterPage from './component/page/register'
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  USER_REGISTER_ROUTE
} from '../shared/routes'
import Loading from './component/Loading'

let LoadableHelloAsyncPage = Loadable({
  loader: () => import(/* webpackChunkName: "HelloAsync" */ './component/page/hello-async'),
  loading: Loading
})

let LoadableHelloPage = Loadable({
  loader: () => import(/* webpackChunkName: "Hello" */ './component/page/hello'),
  loading: Loading
})

let LoadableRegisterPage = Loadable({
  loader: () => import(/* webpackChunkName: "Register" */ './component/page/register'),
  loading: Loading
})

const App = () =>
  <div>
    <h1>{APP_NAME}</h1>
    <Nav />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
      <Route path={HELLO_PAGE_ROUTE} render={() => <LoadableHelloPage />} />
      <Route path={HELLO_ASYNC_PAGE_ROUTE} render={() => <LoadableHelloAsyncPage />} />
      <Route path={USER_REGISTER_ROUTE} render={() => <LoadableRegisterPage />} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
export default App
