import { connect } from 'react-redux'
import { updateVehicleRequest } from '../actions'
import { fromJS } from 'immutable'

import VehicleUpdateFormCreator from '../components/VehicleUpdateFormCreator'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'
import { makeVehicleInitialValuesSelector } from '../selectors'

const makeMapStateToProps = () => {
  const vehicleInitialValuesSelector = makeVehicleInitialValuesSelector()
  const mapStateToProps = (state, ownProps) => {
    const initialValues = vehicleInitialValuesSelector(ownProps)
    return { initialValues }
  }
  return mapStateToProps
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
  connect(makeMapStateToProps, mapDispatchToProps)(
    immutPropsToJS(VehicleUpdateFormCreator(vehicleId))
  )
