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
      // const captain = values.get('captain')
      // const principal = values.get('principal')
      // const secondary = values.get('secondary')
      // const createValues = values.withMutations(mutation =>
      //   mutation
      //     .update('captain', item => item && item.get('username'))
      //     .update('principal', item => item && item.get('username'))
      //     .update('secondary', item => item && item.get('username'))
      //     .set(
      //       'captainName',
      //       captain && `${captain.get('fullname')}(${captain.get('username')})`
      //     )
      //     .set(
      //       'principalName',
      //       principal &&
      //         `${principal.get('fullname')}(${principal.get('username')})`
      //     )
      //     .set(
      //       'secondaryName',
      //       secondary &&
      //         `${secondary.get('fullname')}(${secondary.get('username')})`
      //     )
      // )
      // dispatch(createVehicleRequest(createValues))
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
