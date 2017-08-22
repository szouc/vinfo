// @flow

import {
  SET_LOADING,
  SET_AUTH,
  REQUEST_ERROR,
  FETCH_PROFILE_SUCCESS
} from '../constants'

import type { fromJS as Immut } from 'immutable'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  loginLoading: false,
  fetchProfileLoading: false,
  loggedIn: global.window.localStorage.getItem('auth/loggedIn'),
  user: {},
  error: ''
})

const authReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  const { type, payload } = action
  switch (type) {
    case SET_LOADING:
      return state.set([`${payload.scope}Loading`], payload.loading)
    case SET_AUTH:
      return state.set('loggedIn', payload)
    case REQUEST_ERROR:
      return state.set('error', payload)
    case FETCH_PROFILE_SUCCESS:
      return state.set('user', payload)
    default:
      return state
  }
}

export default authReducer
