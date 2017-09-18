// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_USER_SUCCESS,
  // FETCH_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  FETCH_USER_LIST_SUCCESS
} from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import immutable, { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

const InitialState = fromJS({
  fetchListLoading: false,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: undefined,
  current: undefined,
  all: []
})

const userEntity = (
  state: Immut = immutable.Map({}),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_USER_LIST_SUCCESS:
      if (payload.get('entities')) {
        return payload.get('entities')
      }
      return state
    case CREATE_USER_SUCCESS:
      return state.mergeIn(
        ['users'],
        payload.getIn(['entities', 'users'])
      )
    case DELETE_USER_SUCCESS:
      return state.deleteIn(['users', payload])
    case UPDATE_USER_SUCCESS:
      return state.mergeIn(
        ['users'],
        payload.getIn(['entities', 'users'])
      )
    default:
      return state
  }
}

const userStatus = (
  state: Immut = InitialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case SET_LOADING:
      return state.set(`${payload.scope}Loading`, payload.loading)
    case REQUEST_ERROR:
      return state.set('error', payload)
    case CREATE_USER_SUCCESS:
      const pushToAll = state.get('all').unshift(payload.get('result'))
      return state.set('all', pushToAll)
    case DELETE_USER_SUCCESS:
      const productPosition = state.get('all').indexOf(payload)
      return state.deleteIn(['all', productPosition])
    default:
      return state
  }
}

const reducer = combineReducers({
  userStatus,
  userEntity
})

export default reducer
