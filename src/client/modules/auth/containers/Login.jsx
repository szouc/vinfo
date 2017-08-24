import { connect } from 'react-redux'

import Login from '../components/Login'
import { loginRequest } from '../actions'

const mapStateToProps = state => {
  const auth = state.get('auth')
  const errorMessage = auth.get('error')
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
