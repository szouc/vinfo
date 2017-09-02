// @flow

import { createAction } from 'redux-actions'
import {
  CREATE_COMPANY_REQUEST,
  UPDATE_COMPANY_REQUEST,
  DELETE_COMPANY_REQUEST,
  FETCH_COMPANY_LIST_REQUEST
} from './actionTypes'

export const fetchCompanyListRequest = createAction(FETCH_COMPANY_LIST_REQUEST)
export const createCompanyRequest = createAction(CREATE_COMPANY_REQUEST)
export const updateCompanyRequest = createAction(UPDATE_COMPANY_REQUEST)
export const deleteCompanyRequest = createAction(DELETE_COMPANY_REQUEST)
