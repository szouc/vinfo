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
    idNo: ownProps.user.detail && ownProps.user.detail.idNo,
    licenseNo: ownProps.user.detail && ownProps.user.detail.licenseNo,
    license: ownProps.user.detail && ownProps.user.detail.license,
    idFront: ownProps.user.detail && ownProps.user.detail.idFront,
    idBack: ownProps.user.detail && ownProps.user.detail.idBack,
    cert: ownProps.user.detail && ownProps.user.detail.cert,
    certExpired:
      ownProps.user.detail && ownProps.user.detail.certExpired
        ? moment(ownProps.user.detail.certExpired)
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
