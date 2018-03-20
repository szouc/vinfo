import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch, withRouter } from 'react-router-dom'
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

// const LoadableFuel = Loadable({
//   loader: () => import(/* webpackChunkName: "FuelComponent" */ '../Fuel'),
//   loading: () => null
// })

const LoadableTransport = Loadable({
  loader: () =>
    import(/* webpackChunkName: "TransportComponent" */ '../Transport'),
  loading: () => null
})

class BaseContent extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route path='/home' component={NotFound} />
        <Route path='/company' component={LoadableCompany} />
        <Route path='/product' component={LoadableProduct} />
        <Route path='/user' component={LoadableUser} />
        <Route path='/vehicle' component={LoadableVehicle} />
        <Route path='/transport' component={LoadableTransport} />
        <Route component={NotFound} />
      </Switch>
    )
    //   return (
    //     <Switch>
    //       <Route path='/home' component={NotFound} />
    //       <Route path='/company' component={LoadableCompany} />
    //       <Route path='/vehicle' component={LoadableVehicle} />
    //       <Route path='/user' component={LoadableUser} />
    //       <Route path='/product' component={LoadableProduct} />
    //       <Route path='/transport' component={LoadableTransport} />
    //       <Route path='/fuel' component={LoadableFuel} />
    //       <Route component={NotFound} />
    //     </Switch>
    //   )
  }
}

export default withRouter(BaseContent)
