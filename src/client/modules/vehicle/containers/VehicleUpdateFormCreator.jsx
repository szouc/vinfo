import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateVehicleRequest } from '../actions'
import { fromJS, isImmutable } from 'immutable'

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
      // const captain = values.get('captain')
      // const principal = values.get('principal')
      // const secondary = values.get('secondary')
      // const updateValues = values.withMutations(mutation =>
      //   mutation
      //     .update(
      //       'captain',
      //       item => (isImmutable(item) ? item.get('username') : item)
      //     )
      //     .update(
      //       'principal',
      //       item => (isImmutable(item) ? item.get('username') : item)
      //     )
      //     .update(
      //       'secondary',
      //       item => (isImmutable(item) ? item.get('username') : item)
      //     )
      //     .set(
      //       'captainName',
      //       isImmutable(captain)
      //         ? `${captain.get('fullname')}(${captain.get('username')})`
      //         : values.get('captainName')
      //     )
      //     .set(
      //       'principalName',
      //       isImmutable(principal)
      //         ? `${principal.get('fullname')}(${principal.get('username')})`
      //         : values.get('principalName')
      //     )
      //     .set(
      //       'secondaryName',
      //       isImmutable(secondary)
      //         ? `${secondary.get('fullname')}(${secondary.get('username')})`
      //         : values.get('secondaryName')
      //     )
      // )
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
