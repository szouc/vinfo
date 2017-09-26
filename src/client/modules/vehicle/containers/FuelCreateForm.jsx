import { connect } from 'react-redux'

import FuelCreateForm from '../components/FuelCreateForm'
import { createFuelRequest } from '../actions'

import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      dispatch(createFuelRequest(values))
    }
  }
}

export default connect(null, mapDispatchToProps)(
  immutPropsToJS(FuelCreateForm)
)
