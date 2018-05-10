// @flow

import * as Type from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { paginationReducerFor } from '@clientModulesShared/paginationReducer'

const InitialState = fromJS({
  formLoading: false,
  listLoading: false,
  selectLoading: false,
  current: undefined,
  selectIds: [],
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
    case Type.FETCH_ALL_SUCCESS:
      return state.set('all', payload)
    case Type.FETCH_LIST_SUCCESS:
      return state.set('all', payload)
    case Type.FETCH_SELECT_SUCCESS:
      return state.set('selectIds', payload)
    case Type.CREATE_SUCCESS:
      const pushToAll = state.get('all').unshift(payload)
      return state.set('current', payload).set('all', pushToAll)
    case Type.DELETE_SUCCESS:
      const companyPosition = state.get('all').indexOf(payload)
      return state.deleteIn(['all', companyPosition])
    default:
      return state
  }
}

const companyReducer = combineReducers({
  status: companyStatus,
  pagination: paginationReducerFor('COMPANY')
})

export default companyReducer
