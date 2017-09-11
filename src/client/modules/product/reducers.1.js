// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_LIST_SUCCESS
} from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import immutable, { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { priceHistoryStatus } from './priceHistory/reducers'

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

const productEntity = (
  state: Immut = immutable.Map(),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_PRODUCT_LIST_SUCCESS:
      if (payload.get('entities')) {
        return payload.get('entities')
      }
      return state
    case CREATE_PRODUCT_SUCCESS:
      return state.mergeIn(
        ['products'],
        payload.getIn(['entities', 'products'])
      )
    case DELETE_PRODUCT_SUCCESS:
      return state.deleteIn(['products', payload])
    case UPDATE_PRODUCT_SUCCESS:
      return state.mergeIn(
        ['products'],
        payload.getIn(['entities', 'products'])
      )
    default:
      return state
  }
}

const productStatus = (
  state: Immut = InitialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case SET_LOADING:
      return state.set(`${payload.scope}Loading`, payload.loading)
    case REQUEST_ERROR:
      return state.set('error', payload)
    case FETCH_PRODUCT_SUCCESS:
      return state.set('all', payload.get('result'))
    case CREATE_PRODUCT_SUCCESS:
      const pushToAll = state.get('all').push(payload.get('result'))
      return state.set('current', payload.get('result')).set('all', pushToAll)
    case DELETE_PRODUCT_SUCCESS:
      const popFromAll = state.get('all').pop(payload)
      return state.set('all', popFromAll)
    default:
      return state
  }
}

const reducer = combineReducers({
  productStatus,
  productEntity,
  priceHistoryStatus
})

export default reducer
