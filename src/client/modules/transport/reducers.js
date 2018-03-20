// @flow

import * as Type from './actionTypes'

import { paginationReducerFor } from '@clientModulesShared/paginationReducer'
import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

const InitialState = fromJS({
  formLoading: false,
  listLoading: false,
  current: undefined,
  all: []
})

// const transportEntity = (
//   state: Immut = immutable.Map({}),
//   action: { type: string, payload: any }
// ) => {
//   const { type, payload } = action
//   switch (type) {
//     // case FETCH_VEHICLE_LIST_SUCCESS:
//     //   if (payload.get('entities')) {
//     //     return payload.get('entities')
//     //   }
//     // return state
//     case CREATE_SUCCESS:
//       return state.mergeDeep(payload.get('entities'))
//     // case DELETE_VEHICLE_SUCCESS:
//     //   return state.deleteIn(['vehicles', payload])
//     // case UPDATE_VEHICLE_SUCCESS:
//     //   return state.mergeDeep(payload.get('entities'))
//     // case CREATE_FUEL_SUCCESS:
//     //   return state.mergeDeep(payload.get('entities'))
//     default:
//       return state
//   }
// }

const transportStatus = (
  state: Immut = InitialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case Type.SET_LOADING:
      return state.set(`${payload.scope}Loading`, payload.loading)
    case Type.CREATE_SUCCESS:
      const pushToAll = state.get('all').unshift(payload)
      return state.set('all', pushToAll)
    // case FETCH_VEHICLE_LIST_SUCCESS:
    //   return state.set('all', payload.get('result'))
    // case DELETE_VEHICLE_SUCCESS:
    //   const productPosition = state.get('all').indexOf(payload)
    //   return state.deleteIn(['all', productPosition])
    default:
      return state
  }
}

const reducer = combineReducers({
  status: transportStatus,
  pagination: paginationReducerFor('TRANSPORT')
})

export default reducer
