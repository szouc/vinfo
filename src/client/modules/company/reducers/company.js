// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_SUCCESS,
  DELETE_COMPANY_SUCCESS,
  FETCH_LIST_SUCCESS
} from '../constants'

import type { fromJS as Immut } from 'immutable'
import Immutable from 'immutable'

const InitialState = Immutable.fromJS({
  fetchListLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: '',
  company: [],
  current: {}
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
      const company = Immutable.fromJS(payload)
      return state.get('company').push(company)
    default:
      return state
  }
}

export default companyReducer
