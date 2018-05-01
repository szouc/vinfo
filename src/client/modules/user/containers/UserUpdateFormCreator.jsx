import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateUserRequest } from '../actions'
import { fromJS } from 'immutable'
import moment from 'moment'

import UserUpdateFormCreator from '../components/UserUpdateFormCreator'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = (state, ownProps) => {
  const loading = state.getIn(['user', 'status', 'formUpdateLoading'])
  const initialValues = {
    fullname: ownProps.user.fullname,
    gender: ownProps.user.gender,
    role: ownProps.user.role,
    licence: ownProps.user.licence,
    idFront: ownProps.user.idFront,
    idBack: ownProps.user.idBack,
    cert: ownProps.user.cert,
    cert_expired: ownProps.user.cert_expired
      ? moment(ownProps.user.cert_expired)
      : null
  }

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
