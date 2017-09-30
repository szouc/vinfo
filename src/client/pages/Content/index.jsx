import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'
// import Carousel from '../Carousel'
// import Company from '../Company'
// import Product from '../Product'
// import User from '../User'
// import Vehicle from '../Vehicle'
// import Fuel from '../Fuel'
import NotFound from '../NotFound'

const LoadableCompany = Loadable({
  loader: () => import(/* webpackChunkName: "CompanyComponent" */ '../Company'),
  loading: () => null
})

const LoadableProduct = Loadable({
  loader: () => import(/* webpackChunkName: "ProductComponent" */ '../Product'),
  loading: () => null
})

const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: "UserComponent" */ '../User'),
  loading: () => null
})

const LoadableVehicle = Loadable({
  loader: () => import(/* webpackChunkName: "VehicleComponent" */ '../Vehicle'),
  loading: () => null
})

const LoadableFuel = Loadable({
  loader: () => import(/* webpackChunkName: "FuelComponent" */ '../Fuel'),
  loading: () => null
})

class BaseContent extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path='/home' component={NotFound} />
        <Route exact path='/company' component={LoadableCompany} />
        <Route exact path='/vehicle' component={LoadableVehicle} />
        <Route exact path='/user' component={LoadableUser} />
        <Route exact path='/product' component={LoadableProduct} />
        <Route exact path='/fuel' component={LoadableFuel} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default BaseContent
