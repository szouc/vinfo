// @flow

import * as Type from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { paginationReducerFor } from '@clientModulesShared/paginationReducer'

const InitialState = fromJS({
  formLoading: false,
  listLoading: false,
  formPHLoading: false,
  selectLoading: false,
  listPHLoading: false,
  formUpdateLoading: false,
  current: undefined,
  selectIds: [],
  all: []
})

const productStatus = (
  state: Immut = InitialState,
  action: { type: String, payload: any }
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
    case Type.UPDATE_SUCCESS:
      return state.set('current', payload)
    case Type.DELETE_SUCCESS:
      const productPosition = state.get('all').indexOf(payload)
      return state.deleteIn(['all', productPosition])
    default:
      return state
  }
}

const productReducer = combineReducers({
  status: productStatus,
  pagination: paginationReducerFor('PRODUCT')
})

export default productReducer
