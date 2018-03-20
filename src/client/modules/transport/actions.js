// @flow

import { createAction } from 'redux-actions'
import * as Type from './actionTypes'

export const fetchTransportRequest = createAction(Type.FETCH_REQUEST)
export const fetchTransportListRequest = createAction(Type.FETCH_LIST_REQUEST)
export const fetchTransportAllRequest = createAction(Type.FETCH_ALL_REQUEST)
export const updateTransportRequest = createAction(Type.UPDATE_REQUEST)
export const createTransportRequest = createAction(Type.CREATE_REQUEST)
export const deleteTransportRequest = createAction(Type.DELETE_REQUEST)
