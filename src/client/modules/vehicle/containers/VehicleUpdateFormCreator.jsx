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
    const initialValues = vehicleInitialValuesSelector(ownProps)
    console.log(initialValues.toJS())
    return { loading, initialValues }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      const captain = {}
      if (values.get('captain')) {
        captain.username = values.get('captain').split('@@')[0]
        captain.fullname = values.get('captain').split('@@')[1]
      }
      const driver = { principal: {}, secondary: {} }
      if (values.get('principal')) {
        const principal = values.get('principal').split('@@')
        driver.principal.username = principal[0]
        driver.principal.fullname = principal[1]
      }
      if (values.get('secondary')) {
        const secondary = values.get('secondary').split('@@')
        driver.secondary.username = secondary[0]
        driver.secondary.fullname = secondary[1]
      }
      const req = values.withMutations(value =>
        value
          .set('captain', fromJS(captain))
          .set('principal', fromJS(driver.principal))
          .set('secondary', fromJS(driver.secondary))
      )
      dispatch(
        updateVehicleRequest(
          fromJS({ vehicleId: ownProps.vehicle._id, values: req })
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
