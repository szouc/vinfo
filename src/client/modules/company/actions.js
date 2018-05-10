// @flow

import { createAction } from 'redux-actions'
import * as Type from './actionTypes'

export const fetchCompanyAllRequest = createAction(Type.FETCH_ALL_REQUEST)
export const fetchCompanyListRequest = createAction(Type.FETCH_LIST_REQUEST)
export const createCompanyRequest = createAction(Type.CREATE_REQUEST)
export const updateCompanyRequest = createAction(Type.UPDATE_REQUEST)
export const deleteCompanyRequest = createAction(Type.DELETE_REQUEST)
export const fetchSelectRequest = createAction(Type.FETCH_SELECT_REQUEST)
