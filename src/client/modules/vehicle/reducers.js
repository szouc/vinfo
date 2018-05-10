// @flow

import * as Type from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { paginationReducerFor } from '@clientModulesShared/paginationReducer'

// const fuelEntity = (
//   state: Immut = immutable.Map({}),
//   action: { type: string, payload: any }
// ) => {
//   const { type, payload } = action
//   switch (type) {
//     case Type.FETCH_LIST_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'fuels']))
//     case Type.CREATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'fuels']))
//     case Type.UPDATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'fuels']))
//     case Type.CREATE_FUEL_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'fuels']))
//     case Type.CREATE_MAINTAIN_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'fuels']))
//     default:
//       return state
//   }
// }

// const maintainEntity = (
//   state: Immut = immutable.Map({}),
//   action: { type: string, payload: any }
// ) => {
//   const { type, payload } = action
//   switch (type) {
//     case Type.FETCH_LIST_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'maintenance']))
//     case Type.CREATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'maintenance']))
//     case Type.UPDATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'maintenance']))
//     case Type.CREATE_FUEL_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'maintenance']))
//     case Type.CREATE_MAINTAIN_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'maintenance']))
//     default:
//       return state
//   }
// }

// const vehicleEntity = (
//   state: Immut = immutable.Map({}),
//   action: { type: string, payload: any }
// ) => {
//   const { type, payload } = action
//   switch (type) {
//     case Type.FETCH_LIST_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'vehicles']))
//     case Type.CREATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'vehicles']))
//     case Type.DELETE_SUCCESS:
//       return state.delete(payload.get('vehicleId'))
//     case Type.UPDATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'vehicles']))
//     case Type.CREATE_FUEL_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'vehicles']))
//     case Type.CREATE_MAINTAIN_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'vehicles']))
//     default:
//       return state
//   }
// }

const InitialState = fromJS({
  formLoading: false,
  listLoading: false,
  formFuelLoading: false,
  formMaintainLoading: false,
  formUpdateLoading: false,
  selectLoading: false,
  current: undefined,
  selectIds: [],
  all: []
})

const vehicleStatus = (
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
    case Type.FETCH_ALL_SUCCESS:
      return state.set('all', payload)
    case Type.FETCH_LIST_SUCCESS:
      return state.set('all', payload)
    case Type.FETCH_SELECT_SUCCESS:
      return state.set('selectIds', payload)
    case Type.UPDATE_SUCCESS:
      return state.set('current', payload)
    case Type.DELETE_SUCCESS:
      const vehiclePosition = state.get('all').indexOf(payload)
      return state.deleteIn(['all', vehiclePosition]).delete('current')
    default:
      return state
  }
}

const vehicleReducer = combineReducers({
  status: vehicleStatus,
  pagination: paginationReducerFor('VEHICLE')
})

export default vehicleReducer
