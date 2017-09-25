import { connect } from 'react-redux'

import VehicleCreateForm from '../components/VehicleCreateForm'
import { createVehicleRequest } from '../actions'

import immutPropsToJS from '@clientModulesShared/immutPropsToJS'
import Immutable from 'immutable'

const mapStateToProps = state => null

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      let req
      if (values.get('principal') && values.get('secondary')) {
        const principal = values.get('principal').split('@@')
        const secondary = values.get('secondary').split('@@')
        req = values
          .set(
            'principal',
            Immutable.Map({ username: principal[0], fullname: principal[1] })
          )
          .set(
            'secondary',
            Immutable.Map({ username: secondary[0], fullname: secondary[1] })
          )
      } else {
        req = values
      }
      dispatch(createVehicleRequest(req))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(VehicleCreateForm)
)
