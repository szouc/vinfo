// @flow

import * as Type from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { paginationReducerFor } from '@clientModulesShared/paginationReducer'

// const userEntity = (
//   state: Immut = immutable.Map({}),
//   action: { type: String, payload: any }
// ) => {
//   const { type, payload } = action
//   switch (type) {
//     case Type.FETCH_ALL_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'users']))
//     case Type.FETCH_LIST_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'users']))
//     case Type.CREATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'users']))
//     case Type.DELETE_SUCCESS:
//       return state.delete(payload.get('username'))
//     case Type.UPDATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'users']))
//     default:
//       return state
//   }
// }

const InitialState = fromJS({
  formLoading: false,
  listLoading: false,
  formUpdateLoading: false,
  current: undefined,
  driverIds: [],
  captainIds: [],
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
    case Type.CREATE_SUCCESS:
      const pushToAll = state.get('all').unshift(payload)
      return state.set('current', payload).set('all', pushToAll)
    case Type.FETCH_LIST_SUCCESS:
      return state.set('all', payload)
    case Type.FETCH_DRIVER_SUCCESS:
      return state.set('driverIds', payload)
    case Type.FETCH_CAPTAIN_SUCCESS:
      return state.set('captainIds', payload)
    case Type.FETCH_ALL_SUCCESS:
      return state.set('all', payload)
    case Type.UPDATE_SUCCESS:
      return state.set('current', payload)
    case Type.DELETE_SUCCESS:
      const userPosition = state.get('all').indexOf(payload)
      return state.deleteIn(['all', userPosition])
    default:
      return state
  }
}

const userReducer = combineReducers({
  status: userStatus,
  pagination: paginationReducerFor('USER')
})

export default userReducer
