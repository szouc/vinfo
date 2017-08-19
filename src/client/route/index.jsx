import { Route, Switch } from 'react-router-dom'

import Layout from '../pages/Layout'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import React from 'react'

const BaseRoute = () => {
  return (
    <Switch>
      <Route exact path='/' component={Layout} />
      <Route path='/login' component={Login} />
      <Route render={() => <NotFound />} />
    </Switch>
  )
}

export default BaseRoute
