// @flow

import * as Type from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { paginationReducerFor } from '@clientModulesShared/paginationReducer'

// const priceHistoryEntity = (
//   state: Immut = immutable.Map({}),
//   action: { type: string, payload: any }
// ) => {
//   const { type, payload } = action
//   switch (type) {
//     case Type.FETCH_ALL_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'price_histories']))
//     case Type.FETCH_LIST_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'price_histories']))
//     case Type.CREATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'price_histories']))
//     case Type.UPDATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'price_histories']))
//     case Type.CREATE_PRICE_HISTORY_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'price_histories']))
//     case Type.DELETE_PRICE_HISTORY_SUCCESS:
//       return state.delete(payload.get('priceHistoryId'))
//     default:
//       return state
//   }
// }

// const productEntity = (
//   state: Immut = immutable.Map({}),
//   action: { type: string, payload: any }
// ) => {
//   const { type, payload } = action
//   switch (type) {
//     case Type.FETCH_ALL_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'products']))
//     case Type.FETCH_LIST_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'products']))
//     case Type.CREATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'products']))
//     case Type.DELETE_SUCCESS:
//       return state.delete(payload.get('productId'))
//     case Type.UPDATE_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'products']))
//     case Type.CREATE_PRICE_HISTORY_SUCCESS:
//       return state.merge(payload.getIn(['entities', 'products']))
//     case Type.DELETE_PRICE_HISTORY_SUCCESS:
//       const phPosition = state
//         .getIn([payload.get('productId'), 'priceHistory'])
//         .indexOf(payload.get('priceHistoryId'))
//       return state.deleteIn([
//         payload.get('productId'),
//         'priceHistory',
//         phPosition
//       ])
//     default:
//       return state
//   }
// }

const InitialState = fromJS({
  formLoading: false,
  listLoading: false,
  formPHLoading: false,
  listPHLoading: false,
  formUpdateLoading: false,
  current: undefined,
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
