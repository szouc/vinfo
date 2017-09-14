// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_PRODUCT_SUCCESS,
  // FETCH_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_LIST_SUCCESS,
  CREATE_PRICE_HISTORY_SUCCESS,
  DELETE_PRICE_HISTORY_SUCCESS
} from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import immutable, { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

const InitialState = fromJS({
  fetchListLoading: false,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  fetchPHLoading: false,
  createPHLoading: false,
  deletePHLoading: false,
  error: undefined,
  current: undefined,
  all: []
})

const priceHistoryEntity = (
  state: Immut = immutable.Map({}),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_PRODUCT_SUCCESS:
      return state.mergeIn(
        ['price_histories'],
        payload.getIn(['entities', 'price_histories'])
      )
    case UPDATE_PRODUCT_SUCCESS:
      return state.mergeIn(
        ['price_histories'],
        payload.getIn(['entities', 'price_histories'])
      )
    case CREATE_PRICE_HISTORY_SUCCESS:
      return state.mergeIn(
        ['price_histories'],
        payload.getIn(['entities', 'price_histories'])
      )
    case DELETE_PRICE_HISTORY_SUCCESS:
      return state.deleteIn(['price_histories', payload.get('priceHistoryId')])
    default:
      return state
  }
}

const productEntity = (
  state: Immut = immutable.Map({}),
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
      return priceHistoryEntity(state, action).mergeIn(
        ['products'],
        payload.getIn(['entities', 'products'])
      )
    case DELETE_PRODUCT_SUCCESS:
      return state.deleteIn(['products', payload])
    case UPDATE_PRODUCT_SUCCESS:
      return priceHistoryEntity(state, action).mergeIn(
        ['products'],
        payload.getIn(['entities', 'products'])
      )
    case CREATE_PRICE_HISTORY_SUCCESS:
      return priceHistoryEntity(state, action).mergeIn(
        ['products'],
        payload.getIn(['entities', 'products'])
      )
    case DELETE_PRICE_HISTORY_SUCCESS:
      const priceHistoryPosition = state
        .getIn(['products', payload.get('productId'), 'price_history'])
        .indexOf(payload.get('priceHistoryId'))
      return priceHistoryEntity(state, action).deleteIn([
        'products',
        payload.get('productId'),
        'price_history',
        priceHistoryPosition
      ])
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
    case FETCH_PRODUCT_LIST_SUCCESS:
      return state.set('all', payload.get('result'))
    case CREATE_PRODUCT_SUCCESS:
      const pushToAll = state.get('all').push(payload.get('result'))
      return state.set('current', payload.get('result')).set('all', pushToAll)
    case DELETE_PRODUCT_SUCCESS:
      const productPosition = state.get('all').indexOf(payload)
      return state.deleteIn(['all', productPosition])
    default:
      return state
  }
}

const reducer = combineReducers({
  productStatus,
  productEntity
})

export default reducer
