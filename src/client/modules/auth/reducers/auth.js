// @flow

import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS
} from '../actions/auth'

import type { fromJS as Immut } from 'immutable'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  logged: false,
  username: ''
})

const authReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return state.set('auth', 'Loading...')
    case USER_LOGIN_SUCCESS:
      return state.set('username', action.payload.username)
    case USER_LOGIN_FAILURE:
      return state.set('logged', false)
    default:
      return state
  }
}

export default authReducer
