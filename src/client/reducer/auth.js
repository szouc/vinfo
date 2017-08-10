// @flow

import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS
} from '../action/auth'

import type { fromJS as Immut } from 'immutable'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  message: 'Initial reducer message',
  messageAsync: 'Initial reducer message for async call'
})

const authReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return state.set('messageAsync', 'Loading...')
    case USER_LOGIN_SUCCESS:
      return state.set('messageAsync', action.payload)
    case USER_LOGIN_FAILURE:
      return state.set('messageAsync', 'No message received, please check your connection')
    default:
      return state
  }
}

export default authReducer
