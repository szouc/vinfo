import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateUserRequest } from '../actions'
import { fromJS } from 'immutable'

import UserUpdateFormCreator from '../components/UserUpdateFormCreator'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'
import { makeUserInitialValuesSelector } from '../selectors'

const makeMapStateToProps = () => {
  const userInitialValuesSelector = makeUserInitialValuesSelector()
  const mapStateToProps = (state, ownProps) => {
    const loading = state.getIn(['user', 'status', 'formUpdateLoading'])
    const initialValues = userInitialValuesSelector(ownProps)
    return { loading, initialValues }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      dispatch(
        updateUserRequest(fromJS({ username: ownProps.user.username, values }))
      )
    }
  }
}

export default username =>
  compose(
    connect(makeMapStateToProps, mapDispatchToProps),
    immutPropsToJS,
    withNoDelayLoading
  )(UserUpdateFormCreator(username))
