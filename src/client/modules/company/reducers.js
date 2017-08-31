// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_SUCCESS,
  // DELETE_COMPANY_SUCCESS,
  FETCH_LIST_SUCCESS
} from './actionTypess'

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'

const InitialState = fromJS({
  fetchListLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: '',
  company: [],
  current: '',
  edit: ''
})

const companyReducer = (
  state: Immut = InitialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case SET_LOADING:
      return state.set(`${payload.scope}Loading`, payload.loading)
    case REQUEST_ERROR:
      return state.set('error', payload)
    case FETCH_LIST_SUCCESS:
      const company = fromJS(payload)
      return state.get('company').clear().concat(company)
    case CREATE_COMPANY_SUCCESS:
      const newCompany = fromJS(payload)
      return state.get('company').push(newCompany)
    case UPDATE_COMPANY_SUCCESS:
      return state.get('company')
    default:
      return state
  }
}

export default companyReducer
