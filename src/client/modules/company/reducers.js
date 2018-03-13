// @flow

import * as Type from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import immutable, { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { paginationReducerFor } from '@clientModulesShared/paginationReducer'

const InitialState = fromJS({
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  current: undefined,
  all: []
})

const companyEntity = (
  state: Immut = immutable.Map({}),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case Type.FETCH_COMPANY_ALL_SUCCESS:
      return state.merge(payload.getIn(['entities', 'companies']))
    case Type.FETCH_COMPANY_LIST_SUCCESS:
      return state.merge(payload.getIn(['entities', 'companies']))
    case Type.CREATE_COMPANY_SUCCESS:
      return state.merge(payload.getIn(['entities', 'companies']))
    case Type.DELETE_COMPANY_SUCCESS:
      return state.delete(payload)
    case Type.UPDATE_COMPANY_SUCCESS:
      return state.merge(payload.getIn(['entities', 'companies']))
    default:
      return state
  }
}

const companyStatus = (
  state: Immut = InitialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case Type.SET_LOADING:
      return state.set(`${payload.scope}Loading`, payload.loading)
    case Type.FETCH_COMPANY_ALL_SUCCESS:
      return state.set('all', payload.get('result'))
    case Type.FETCH_COMPANY_LIST_SUCCESS:
      return state.set('all', payload.get('result'))
    case Type.CREATE_COMPANY_SUCCESS:
      const pushToAll = state.get('all').clear().unshift(payload.get('result'))
      return state.set('current', payload.get('result')).set('all', pushToAll)
    case Type.DELETE_COMPANY_SUCCESS:
      const popFromAll = state.get('all').pop(payload)
      return state.set('all', popFromAll)
    default:
      return state
  }
}

const companyReducer = combineReducers({
  status: companyStatus,
  pagination: paginationReducerFor('COMPANY_')
})

export { companyEntity, companyReducer }
