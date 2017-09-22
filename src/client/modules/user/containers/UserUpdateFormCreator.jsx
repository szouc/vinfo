import { connect } from 'react-redux'
import { updateUserRequest } from '../actions'
import { fromJS } from 'immutable'
import moment from 'moment'

import UserUpdateFormCreator from '../components/UserUpdateFormCreator'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = (state, ownProps) => {
  const errorMessage = state.getIn(['user', 'userStatus', 'error'])
  const initialValues = {
    fullname: ownProps.user.fullname,
    gender: ownProps.user.gender,
    role: ownProps.user.role,
    licence: ownProps.user.licence,
    id_front: ownProps.user.id_front,
    id_back: ownProps.user.id_back,
    cert: ownProps.user.cert,
    cert_expired: ownProps.user.cert_expired ? moment(ownProps.user.cert_expired) : null
  }

  return { errorMessage, initialValues }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      dispatch(
        updateUserRequest(
          fromJS({ username: ownProps.user.username, values })
        )
      )
    }
  }
}

export default username =>
  connect(mapStateToProps, mapDispatchToProps)(
    immutPropsToJS(UserUpdateFormCreator(username))
  )
