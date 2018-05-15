import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateVehicleRequest } from '../actions'
import { fromJS } from 'immutable'

import VehicleUpdateFormCreator from '../components/VehicleUpdateFormCreator'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'
import { makeVehicleInitialValuesSelector } from '../selectors'

const makeMapStateToProps = () => {
  const vehicleInitialValuesSelector = makeVehicleInitialValuesSelector()
  const mapStateToProps = (state, ownProps) => {
    const loading = state.getIn(['vehicle', 'status', 'formUpdateLoading'])
    const users = state.getIn(['entities', 'users'])
    const initialValues = vehicleInitialValuesSelector(ownProps)
    return { loading, users, initialValues }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: state => values => {
      const updateValues = values.merge(state)
      dispatch(
        updateVehicleRequest(
          fromJS({ vehicleId: ownProps.vehicle._id, values: updateValues })
        )
      )
    }
  }
}

export default vehicleId =>
  compose(
    connect(makeMapStateToProps, mapDispatchToProps),
    immutPropsToJS,
    withNoDelayLoading
  )(VehicleUpdateFormCreator(vehicleId))
