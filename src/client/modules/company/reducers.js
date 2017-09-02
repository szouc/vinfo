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
import { combineReducers } from 'redux-immutable'

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

const companyEntity = (
  state: Immut = immutable.Map(),
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_COMPANY_LIST_SUCCESS:
      if (payload.entities.companies) {
        const company = payload.getIn(['entities', 'companies'])
        return state.merge(company)
      }
      return state
    case CREATE_COMPANY_SUCCESS:
      const newCompany = payload.getIn(['entities', 'companies'])
      return state.merge(newCompany)
    case DELETE_COMPANY_SUCCESS:
      const deleteCompany = payload
      return state.delete(deleteCompany)
    case UPDATE_COMPANY_SUCCESS:
      const updateCompany = payload.getIn(['entities', 'companies'])
      return state.merge(updateCompany)
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
    case CREATE_COMPANY_SUCCESS:
      return state.set('current', payload.get('result'))
    default:
      return state
  }
}

const reducer = combineReducers({
  companyStatus,
  companyEntity
})

export default reducer
