import Login from '../components/Login'
import {
  userLoginRequest
} from '../actions/auth'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (values) => {
      dispatch(userLoginRequest(values))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

// import React, { Component } from 'react'

// class LoginContainer extends Component {
//   constructor (props) {
//     super(props)
//     this.showValues = this.showValues.bind(this)
//   }

//   showValues = (values) => {
//     console.log(JSON.stringify(values))
//   }

//   render () {
//     return (
//       <div>
//         <Login onSubmit={this.showValues} />
//       </div>
//     )
//   }
// }

export default LoginContainer
