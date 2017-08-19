// @flow

import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE
} from '../actions'

import type { fromJS as Immut } from 'immutable'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  loginLoading: false,
  logoutLoading: false,
  loggedIn: false,
  fullname: null
})

const authReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return state.set('loginLoading', true)
    case USER_LOGIN_SUCCESS:
      return state.set('loginLoading', false).set('loggedIn', true)
    case USER_LOGIN_FAILURE:
      return state.set('loginLoading', false).set('loggedIn', false)
    case USER_LOGOUT_REQUEST:
      return state.set('logoutLoading', true)
    case USER_LOGOUT_SUCCESS:
      return state.set('logoutLoading', false).set('username', null)
    case USER_LOGOUT_FAILURE:
      return state.set('logoutLoading', false)
    default:
      return state
  }
}

export default authReducer
