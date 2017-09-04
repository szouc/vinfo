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
import { priceHistoryEntity, priceHistoryStatus } from './priceHistory/reducers'

const InitialState = fromJS({
  fetchListLoading: false,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: '',
  current: '',
  isCreating: false
})

const productEntity = (
  state: Immut = immutable.Map(),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_PRODUCT_LIST_SUCCESS:
      if (payload.getIn(['entities', 'products'])) {
        const product = payload.getIn(['entities', 'products'])
        return state.merge(product)
      }
      return state
    case CREATE_PRODUCT_SUCCESS:
      const newProduct = payload.getIn(['entities', 'products'])
      return state.merge(newProduct)
    case DELETE_PRODUCT_SUCCESS:
      const deleteProductId = payload
      return state.delete(deleteProductId)
    case UPDATE_PRODUCT_SUCCESS:
      const updateProduct = payload.getIn(['entities', 'products'])
      return state.merge(updateProduct)
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
    case CREATE_PRODUCT_SUCCESS:
      return state.set('current', payload.get('result'))
    case FETCH_PRODUCT_SUCCESS:
      return state.set('current', payload)
    default:
      return state
  }
}

const reducer = combineReducers({
  productStatus,
  productEntity,
  priceHistoryStatus,
  priceHistoryEntity
})

export default reducer
