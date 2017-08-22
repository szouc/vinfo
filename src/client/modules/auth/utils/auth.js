import React, { Component } from 'react'
import { replace } from 'react-router-redux'
import { connect } from 'react-redux'

import { isLoggedIn } from '../api'

async function validate (location, stateLoggedIn, redirectToLogin) {
  let loggedIn = await isLoggedIn()
  if ((!loggedIn || !stateLoggedIn) && location.pathname !== '/login') {
    redirectToLogin()
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.auth.get('loggedIn')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirectToLogin: () => {
      dispatch(replace('/login'))
    }
  }
}

export default function authHOC (BaseComponent) {
  class CheckedComponent extends Component {
    componentWillMount () {
      this.checkAuthentication(this.props.location, this.props.loggedIn, this.props.redirectToLogin)
    }
    componentWillReceiveProps (nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps.location, nextProps.loggedIn, nextProps.redirectToLogin)
      }
    }
    checkAuthentication (location, loggedIn, redirectToLogin) {
      validate(location, loggedIn, redirectToLogin)
    }
    render () {
      return <BaseComponent {...this.props} />
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(CheckedComponent)
}
