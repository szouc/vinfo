import { connect } from 'react-redux'

import Login from '../components/Login'
import { loginRequest } from '../actions'

const mapStateToProps = state => {
  const errorMessage = state.getIn(['auth', 'error'])
  return { errorMessage }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      dispatch(loginRequest(values))
    }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer
