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
      const req = values
        .set('principal', fromJS(driver.principal))
        .set('secondary', fromJS(driver.secondary))
      dispatch(
        updateVehicleRequest(fromJS({ vehicleId: ownProps.vehicle._id, values: req }))
      )
    }
  }
}

export default vehicleId =>
  connect(makeMapStateToProps, mapDispatchToProps)(
    immutPropsToJS(VehicleUpdateFormCreator(vehicleId))
  )
