// @flow

import * as Type from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import immutable, { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { paginationReducerFor } from '@clientModulesShared/paginationReducer'

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
      return state.delete(payload.get('companyId'))
    case Type.UPDATE_COMPANY_SUCCESS:
      return state.merge(payload.getIn(['entities', 'companies']))
    default:
      return state
  }
}

const InitialState = fromJS({
  formLoading: false,
  listLoading: false,
  current: undefined,
  all: []
})

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
      const pushToAll = state.get('all').unshift(payload.get('result'))
      return state.set('current', payload.get('result')).set('all', pushToAll)
    case Type.DELETE_COMPANY_SUCCESS:
      const companyPosition = state.get('all').indexOf(payload.get('companyId'))
      return state.deleteIn(['all', companyPosition])
    default:
      return state
  }
}

const companyReducer = combineReducers({
  status: companyStatus,
  pagination: paginationReducerFor('COMPANY_')
})

export { companyEntity, companyReducer }
