import { connect } from 'react-redux'

import VehicleListTable from '../components/VehicleListTable'
import { fetchVehicleListRequest, deleteVehicleRequest } from '../actions'

import { vehicleArraySelector } from '../selectors'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const vehicles = vehicleArraySelector(state)
  return { vehicles }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllVehicles: () => {
      dispatch(fetchVehicleListRequest())
    },
    deleteVehicleById: id => () => {
      dispatch(deleteVehicleRequest(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(VehicleListTable)
)
