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
  error: undefined,
  current: undefined,
  isCreating: false
})

const priceHistoryEntity = (
  state: Immut = immutable.Map({}),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_PRICE_HISTORY_LIST_SUCCESS:
      if (payload.getIn(['entities', 'price_histories'])) {
        return state.mergeIn(
          ['price_histories'],
          payload.getIn(['entities', 'price_histories'])
        )
      }
      return state
    case CREATE_PRICE_HISTORY_SUCCESS:
      return state.mergeIn(
        ['price_histories'],
        payload.getIn(['entities', 'price_histories'])
      )
    case DELETE_PRICE_HISTORY_SUCCESS:
      return state.deleteIn(['price_histories'], payload)
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
    case FETCH_PRICE_HISTORY_LIST_SUCCESS:
      return state.set('all', payload.get('result'))
    case CREATE_PRICE_HISTORY_SUCCESS:
      const pushToAll = state.get('all').push(payload.get('result'))
      return state.set('current', payload.get('result')).set('all', pushToAll)
    case DELETE_PRICE_HISTORY_SUCCESS:
      const popFromAll = state.get('all').pop(payload)
      return state.set('all', popFromAll)
    default:
      return state
  }
}

export { priceHistoryEntity, priceHistoryStatus }
