import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateUserRequest } from '../actions'
import { fromJS } from 'immutable'
import moment from 'moment'
import { evolve } from 'ramda'

import UserUpdateFormCreator from '../components/UserUpdateFormCreator'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = (state, ownProps) => {
  const loading = state.getIn(['user', 'status', 'formUpdateLoading'])
  const transformDate = {
    detail: {
      certExpired: moment
    }
  }
  const initialValues = evolve(transformDate, ownProps.user)

  return { loading, initialValues }
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
    connect(mapStateToProps, mapDispatchToProps),
    immutPropsToJS,
    withNoDelayLoading
  )(UserUpdateFormCreator(username))
