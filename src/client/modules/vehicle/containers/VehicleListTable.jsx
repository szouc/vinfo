import { connect } from 'react-redux'
import { compose } from 'redux'

import VehicleListTable from '../components/VehicleListTable'
import { fetchVehicleListRequest, deleteVehicleRequest } from '../actions'

import { vehicleArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = state => {
  const loading = state.getIn(['vehicle', 'status', 'listLoading'])
  const pagination = state.getIn(['vehicle', 'pagination'])
  const vehicles = vehicleArraySelector(state)
  return { loading, pagination, vehicles }
}

const mapDispatchToProps = dispatch => {
  return {
    getVehicles: (pageNumber, pageSize, fromDate, toDate) => {
      dispatch(
        fetchVehicleListRequest({ pageNumber, pageSize, fromDate, toDate })
      )
    },
    deleteVehicleById: id => () => {
      dispatch(deleteVehicleRequest(id))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withDelayLoading
)(VehicleListTable)
