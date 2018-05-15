import { connect } from 'react-redux'
import { compose } from 'redux'
import VehicleCreateForm from '../components/VehicleCreateForm'
import { createVehicleRequest } from '../actions'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.getIn(['vehicle', 'status', 'formLoading']),
    users: state.getIn(['entities', 'users'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: state => values => {
      const createValues = values.merge(state)
      dispatch(createVehicleRequest(createValues))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withNoDelayLoading
)(VehicleCreateForm)
