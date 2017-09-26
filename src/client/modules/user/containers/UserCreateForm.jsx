import { connect } from 'react-redux'

import UserCreateForm from '../components/UserCreateForm'
import { createUserRequest } from '../actions'

import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      dispatch(createUserRequest(values))
    }
  }
}

export default connect(null, mapDispatchToProps)(immutPropsToJS(UserCreateForm))
