import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from '../pages/Layout'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import { authHOC } from '../modules/auth'

// export const childRoutes = [
//   {
//     'path': '/driver',
//     'component': authHOC(DriverHome),
//     'exact': true
//   },
//   {

//   }
// ]

const BaseRoute = () => {
  return (
    <Switch>
      <Route path='/home' component={authHOC(Layout)} />
      <Route path='/login' component={Login} />
      <Route render={() => <NotFound />} />
    </Switch>
  )
}

export default BaseRoute
