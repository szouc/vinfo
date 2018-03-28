
import { connect } from 'react-redux'

import VehicleSelect from '../components/VehicleSelect'
import { fetchVehicleAllRequest } from '../actions'

import { availableVehicleByCaptainSelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const vehicles = availableVehicleByCaptainSelector(state)
  return { vehicles }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllVehicles: () => {
      dispatch(fetchVehicleAllRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(VehicleSelect)
)
