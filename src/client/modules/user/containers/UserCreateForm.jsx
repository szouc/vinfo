import { connect } from 'react-redux'

import UserCreateForm from '../components/UserCreateForm'
import { createUserRequest } from '../actions'

import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const errorMessage = state.getIn(['user', 'userStatus', 'error'])
  return { errorMessage }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      dispatch(createUserRequest(values))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(immutPropsToJS(UserCreateForm))
