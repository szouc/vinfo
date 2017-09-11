// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_SUCCESS,
  DELETE_COMPANY_SUCCESS,
  FETCH_COMPANY_LIST_SUCCESS
} from './actionTypes'

import type { fromJS as Immut } from 'immutable'
import immutable, { fromJS } from 'immutable'
// import { combineReducers } from 'redux-immutable'

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

const companyEntity = (
  state: Immut = immutable.Map({}),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_COMPANY_LIST_SUCCESS:
      if (payload.getIn(['entities', 'companies'])) {
        return state.mergeIn(
          ['companies'],
          payload.getIn(['entities', 'companies'])
        )
      }
      return state
    case CREATE_COMPANY_SUCCESS:
      return state.mergeIn(
        ['companies'],
        payload.getIn(['entities', 'companies'])
      )
    case DELETE_COMPANY_SUCCESS:
      return state.deleteIn(['companies', payload])
    case UPDATE_COMPANY_SUCCESS:
      return state.mergeIn(
        ['companies'],
        payload.getIn(['entities', 'companies'])
      )
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
    case SET_LOADING:
      return state.set(`${payload.scope}Loading`, payload.loading)
    case REQUEST_ERROR:
      return state.set('error', payload)
    case FETCH_COMPANY_LIST_SUCCESS:
      return state.set('all', payload.get('result'))
    case CREATE_COMPANY_SUCCESS:
      const pushToAll = state.get('all').push(payload.get('result'))
      return state.set('current', payload.get('result')).set('all', pushToAll)
    case DELETE_COMPANY_SUCCESS:
      const popFromAll = state.get('all').pop(payload)
      return state.set('all', popFromAll)
    default:
      return state
  }
}

export { companyEntity, companyStatus }

// const reducer = combineReducers({
//   companyStatus,
//   companyEntity
// })

// export default reducer
