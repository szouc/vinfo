import { connect } from 'react-redux'

import VehicleSelect from '../components/VehicleSelect'
import { fetchSelectRequest } from '../actions'

import { vehicleArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const vehicles = vehicleArraySelector(state)
  return { vehicles }
}

const mapDispatchToProps = dispatch => {
  return {
    getVehicles: (page, size, from, to) => {
      dispatch(fetchSelectRequest({ page, size, from, to }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(VehicleSelect)
)
