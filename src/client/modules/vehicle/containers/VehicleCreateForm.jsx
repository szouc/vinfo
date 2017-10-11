import { connect } from 'react-redux'

import VehicleCreateForm from '../components/VehicleCreateForm'
import { createVehicleRequest } from '../actions'

import immutPropsToJS from '@clientModulesShared/immutPropsToJS'
import { fromJS } from 'immutable'

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      const captain = {}
      if (values.get('captain')) {
        captain.username = values.get('captain').split('@@')[0]
        captain.fullname = values.get('captain').split('@@')[1]
      }
      const driver = { principal: {}, secondary: {} }
      if (values.get('principal')) {
        const principal = values.get('principal').split('@@')
        driver.principal.username = principal[0]
        driver.principal.fullname = principal[1]
      }
      if (values.get('secondary')) {
        const secondary = values.get('secondary').split('@@')
        driver.secondary.username = secondary[0]
        driver.secondary.fullname = secondary[1]
      }
      const req = values.withMutations(value =>
        value
          .set('captain', fromJS(captain))
          .set('principal', fromJS(driver.principal))
          .set('secondary', fromJS(driver.secondary))
      )
      dispatch(createVehicleRequest(req))
    }
  }
}

export default connect(null, mapDispatchToProps)(
  immutPropsToJS(VehicleCreateForm)
)
