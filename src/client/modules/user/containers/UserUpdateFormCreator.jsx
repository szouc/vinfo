import { connect } from 'react-redux'
import { updateUserRequest } from '../actions'
import { fromJS } from 'immutable'

import UserUpdateFormCreator from '../components/UserUpdateFormCreator'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = (state, ownProps) => {
  const errorMessage = state.getIn(['user', 'userStatus', 'error'])
  const initialValues = {
    name: ownProps.user.name,
    specs: ownProps.user.specs,
    pricing: ownProps.user.pricing
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
