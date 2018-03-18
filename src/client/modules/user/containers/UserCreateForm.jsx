import { connect } from 'react-redux'
import { compose } from 'redux'

import UserCreateForm from '../components/UserCreateForm'
import { createUserRequest } from '../actions'

import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = (state, ownProps) => {
  const loading = state.getIn(['product', 'status', 'formLoading'])
  return {
    loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      dispatch(createUserRequest(values))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withNoDelayLoading
)(UserCreateForm)
