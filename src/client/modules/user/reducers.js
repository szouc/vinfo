// @flow

import * as Type from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import immutable, { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { paginationReducerFor } from '@clientModulesShared/paginationReducer'

const userEntity = (
  state: Immut = immutable.Map({}),
  action: { type: String, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case Type.FETCH_USER_ALL_SUCCESS:
      return state.merge(payload.getIn(['entities', 'users']))
    case Type.FETCH_USER_LIST_SUCCESS:
      return state.merge(payload.getIn(['entities', 'users']))
    case Type.CREATE_USER_SUCCESS:
      return state.merge(payload.getIn(['entities', 'users']))
    case Type.DELETE_USER_SUCCESS:
      return state.delete(payload.get('username'))
    case Type.UPDATE_USER_SUCCESS:
      return state.merge(payload.getIn(['entities', 'users']))
    default:
      return state
  }
}

const InitialState = fromJS({
  formLoading: false,
  listLoading: false,
  formUpdateLoading: false,
  current: undefined,
  all: []
})

const userStatus = (
  state: Immut = InitialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case Type.SET_LOADING:
      return state.set(`${payload.scope}Loading`, payload.loading)
    case Type.CREATE_USER_SUCCESS:
      const pushToAll = state.get('all').unshift(payload.get('result'))
      return state.set('current', payload.get('result')).set('all', pushToAll)
    case Type.FETCH_USER_LIST_SUCCESS:
      return state.set('all', payload.get('result'))
    case Type.FETCH_USER_ALL_SUCCESS:
      return state.set('all', payload.get('result'))
    case Type.UPDATE_USER_SUCCESS:
      return state.set('current', payload.get('result'))
    case Type.DELETE_USER_SUCCESS:
      const userPosition = state.get('all').indexOf(payload.get('username'))
      return state.deleteIn(['all', userPosition])
    default:
      return state
  }
}

const userReducer = combineReducers({
  status: userStatus,
  pagination: paginationReducerFor('USER_')
})

export { userEntity, userReducer }
