import { connect } from 'react-redux'
import { updateVehicleRequest } from '../actions'
import { fromJS } from 'immutable'
import moment from 'moment'

import VehicleUpdateFormCreator from '../components/VehicleUpdateFormCreator'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = (state, ownProps) => {
  const initialValues = {
    plate: ownProps.vehicle.plate,
    engine: ownProps.vehicle.engine,
    model: ownProps.vehicle.model,
    purchase_date: ownProps.vehicle.purchase_date
      ? moment(ownProps.vehicle.purchase_date)
      : ownProps.vehicle.purchase_datel,
    init_mile: ownProps.vehicle.init_mile,
    principal: ownProps.vehicle.principal
      ? `${ownProps.vehicle.principal.fullname}(${ownProps.vehicle.principal
        .username})`
      : ownProps.vehicle.principal,
    secondary: ownProps.vehicle.secondary
      ? `${ownProps.vehicle.secondary.fullname}(${ownProps.vehicle.secondary
        .username})`
      : ownProps.vehicle.secondary
  }

  return { initialValues }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      dispatch(
        updateVehicleRequest(
          fromJS({ productId: ownProps.vehicle._id, values })
        )
      )
    }
  }
}

export default vehicleId =>
  connect(mapStateToProps, mapDispatchToProps)(
    immutPropsToJS(VehicleUpdateFormCreator(vehicleId))
  )
