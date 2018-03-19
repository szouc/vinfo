import { connect } from 'react-redux'

import VehicleSelect from '../components/VehicleSelect'
import { fetchVehicleListRequest } from '../actions'

import { vehicleArrayByUserSelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const vehicles = vehicleArrayByUserSelector(state)
  return { vehicles }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllVehicles: () => {
      dispatch(fetchVehicleListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(VehicleSelect)
)
