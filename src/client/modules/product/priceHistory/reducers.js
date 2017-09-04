// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_PRICE_HISTORY_SUCCESS,
  DELETE_PRICE_HISTORY_SUCCESS,
  FETCH_PRICE_HISTORY_LIST_SUCCESS
} from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import immutable, { fromJS } from 'immutable'

const InitialState = fromJS({
  fetchListLoading: false,
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  error: '',
  current: '',
  isCreating: false
})

const priceHistoryEntity = (
  state: Immut = immutable.Map(),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_PRICE_HISTORY_LIST_SUCCESS:
      if (payload.getIn(['entities', 'price_histories'])) {
        const priceHistory = payload.getIn(['entities', 'price_histories'])
        return state.merge(priceHistory)
      }
      return state
    case CREATE_PRICE_HISTORY_SUCCESS:
      const newPriceHistory = payload.getIn(['entities', 'price_histories'])
      return state.merge(newPriceHistory)
    case DELETE_PRICE_HISTORY_SUCCESS:
      const deletePriceHistoryId = payload
      return state.delete(deletePriceHistoryId)
    default:
      return state
  }
}

const priceHistoryStatus = (
  state: Immut = InitialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case SET_LOADING:
      return state.set(`${payload.scope}Loading`, payload.loading)
    case REQUEST_ERROR:
      return state.set('error', payload)
    case CREATE_PRICE_HISTORY_SUCCESS:
      return state.set('current', payload.get('result'))
    default:
      return state
  }
}

export { priceHistoryEntity, priceHistoryStatus }
