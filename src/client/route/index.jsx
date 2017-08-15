import { Route, Switch } from 'react-router-dom'

import Layout from '../pages/Layout'
import NotFound from '../pages/NotFound'
import React from 'react'

const BaseRoute = () => {
  return (
    <Switch>
      <Route path='/' component={Layout} />
      <Route render={() => <NotFound />} />
    </Switch>
  )
}

export default BaseRoute
