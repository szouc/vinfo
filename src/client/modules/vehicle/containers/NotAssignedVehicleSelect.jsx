
import { connect } from 'react-redux'

import VehicleSelect from '../components/VehicleSelect'
import { fetchVehicleListRequest } from '../actions'

import { availableVehicleByCaptainSelector } from '../selectors'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const vehicles = availableVehicleByCaptainSelector(state)
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
