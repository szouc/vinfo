import React, { Component } from 'react'
import { replace } from 'react-router-redux'
import { connect } from 'react-redux'

import { getLocalLoggedIn, getLocalUser } from '../api'
import { fetchProfileRequest } from '../actions'

/**
 * validate whether login or not according to the localStorage 'loggedIn'
 * @param {any} location - the location of the history
 * @param {any} stateLoggedIn - the loggedIn value in the state
 * @param {any} redirectToLogin - dispatch a redirect action
 */
async function validateLogged(location, stateLoggedIn, redirectToLogin) {
  const loggedIn = await getLocalLoggedIn()
  if ((!loggedIn || !stateLoggedIn) && location.pathname !== '/login') {
    redirectToLogin()
  }
}

/**
 * validate whether had user profile or not according to the localStorage 'user'
 * @param {*} stateUser - the user in the state
 * @param {*} location - the location of the history
 * @param {*} fetchProfile - fetch user profile from the server api
 * @param {*} redirectToLogin - dispath a redirect action
 */
async function validateUser(
  stateUser,
  location,
  fetchProfile,
  redirectToLogin
) {
  const localUser = await getLocalUser()
  if (!localUser && location.pathname !== '/login') {
    redirectToLogin()
  }
  if (localUser && stateUser !== localUser) {
    fetchProfile(localUser)
  }
}

async function validate(
  location,
  stateLoggedIn,
  stateUsername,
  fetchProfile,
  redirectToLogin
) {
  await validateLogged(location, stateLoggedIn, redirectToLogin)
  await validateUser(stateUsername, location, fetchProfile, redirectToLogin)
}

export default function authHOC(BaseComponent) {
  class CheckedComponent extends Component {
    componentWillMount() {
      this.checkAuthentication(this.props)
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps)
      }
    }
    checkAuthentication(props) {
      const {
        location,
        stateloggedIn,
        stateUsername,
        fetchProfile,
        redirectToLogin
      } = props
      validate(
        location,
        stateloggedIn,
        stateUsername,
        fetchProfile,
        redirectToLogin
      )
    }
    render() {
      return <BaseComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    return {
      stateloggedIn: state.getIn(['auth', 'loggedIn']),
      stateUsername: state.getIn(['auth', 'user', 'username'])
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      redirectToLogin: () => {
        dispatch(replace('/login'))
      },
      fetchProfile: value => {
        dispatch(fetchProfileRequest(value))
      }
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(CheckedComponent)
}
