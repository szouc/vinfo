// @flow

import { createAction } from 'redux-actions'
import * as Type from './actionTypes'

export const fetchCompanyAllRequest = createAction(Type.FETCH_COMPANY_ALL_REQUEST)
export const fetchCompanyListRequest = createAction(Type.FETCH_COMPANY_LIST_REQUEST)
export const createCompanyRequest = createAction(Type.CREATE_COMPANY_REQUEST)
export const updateCompanyRequest = createAction(Type.UPDATE_COMPANY_REQUEST)
export const deleteCompanyRequest = createAction(Type.DELETE_COMPANY_REQUEST)
