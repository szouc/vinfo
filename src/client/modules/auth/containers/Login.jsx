import Login from '../components/Login'
import {
  loginRequest
} from '../actions'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const {auth} = state
  return { loggedIn: auth.get('loggedIn') }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (values) => {
      dispatch(loginRequest(values))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
