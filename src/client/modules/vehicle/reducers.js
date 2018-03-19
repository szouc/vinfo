// @flow

import * as Type from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import immutable, { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { paginationReducerFor } from '@clientModulesShared/paginationReducer'

const fuelEntity = (
  state: Immut = immutable.Map({}),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case Type.FETCH_VEHICLE_LIST_SUCCESS:
      return state.merge(payload.getIn(['entities', 'fuels']))
    case Type.CREATE_VEHICLE_SUCCESS:
      return state.merge(payload.getIn(['entities', 'fuels']))
    case Type.UPDATE_VEHICLE_SUCCESS:
      return state.merge(payload.getIn(['entities', 'fuels']))
    case Type.CREATE_FUEL_SUCCESS:
      return state.merge(payload.getIn(['entities', 'fuels']))
    case Type.CREATE_MAINTAIN_SUCCESS:
      return state.merge(payload.getIn(['entities', 'fuels']))
    default:
      return state
  }
}

const maintainEntity = (
  state: Immut = immutable.Map({}),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case Type.FETCH_VEHICLE_LIST_SUCCESS:
      return state.merge(payload.getIn(['entities', 'maintenance']))
    case Type.CREATE_VEHICLE_SUCCESS:
      return state.merge(payload.getIn(['entities', 'maintenance']))
    case Type.UPDATE_VEHICLE_SUCCESS:
      return state.merge(payload.getIn(['entities', 'maintenance']))
    case Type.CREATE_FUEL_SUCCESS:
      return state.merge(payload.getIn(['entities', 'maintenance']))
    case Type.CREATE_MAINTAIN_SUCCESS:
      return state.merge(payload.getIn(['entities', 'maintenance']))
    default:
      return state
  }
}

const vehicleEntity = (
  state: Immut = immutable.Map({}),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case Type.FETCH_VEHICLE_LIST_SUCCESS:
      return state.merge(payload.getIn(['entities', 'vehicles']))
    case Type.CREATE_VEHICLE_SUCCESS:
      return state.merge(payload.getIn(['entities', 'vehicles']))
    case Type.DELETE_VEHICLE_SUCCESS:
      return state.delete(payload.get('vehicleId'))
    case Type.UPDATE_VEHICLE_SUCCESS:
      return state.merge(payload.getIn(['entities', 'vehicles']))
    case Type.CREATE_FUEL_SUCCESS:
      return state.merge(payload.getIn(['entities', 'vehicles']))
    case Type.CREATE_MAINTAIN_SUCCESS:
      return state.merge(payload.getIn(['entities', 'vehicles']))
    default:
      return state
  }
}

const InitialState = fromJS({
  formLoading: false,
  listLoading: false,
  formFuelLoading: false,
  formMaintainLoading: false,
  formUpdateLoading: false,
  current: undefined,
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
    case Type.CREATE_VEHICLE_SUCCESS:
      const pushToAll = state.get('all').unshift(payload.get('result'))
      return state.set('current', payload.get('result')).set('all', pushToAll)
    case Type.FETCH_VEHICLE_ALL_SUCCESS:
      return state.set('all', payload.get('result'))
    case Type.FETCH_VEHICLE_LIST_SUCCESS:
      return state.set('all', payload.get('result'))
    case Type.UPDATE_VEHICLE_SUCCESS:
      return state.set('current', payload.get('result'))
    case Type.DELETE_VEHICLE_SUCCESS:
      const vehiclePosition = state.get('all').indexOf(payload.get('vehicleId'))
      return state.deleteIn(['all', vehiclePosition])
    default:
      return state
  }
}

const vehicleReducer = combineReducers({
  status: vehicleStatus,
  pagination: paginationReducerFor('VEHICLE_')
})

export { fuelEntity, maintainEntity, vehicleEntity, vehicleReducer }
