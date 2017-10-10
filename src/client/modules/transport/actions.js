// @flow

import { createAction } from 'redux-actions'
import {
  FETCH_TRANSPORT_REQUEST,
  FETCH_TRANSPORT_LIST_REQUEST,
  UPDATE_TRANSPORT_REQUEST,
  CREATE_TRANSPORT_REQUEST,
  DELETE_TRANSPORT_REQUEST
} from './actionTypes'

export const fetchTransportRequest = createAction(FETCH_TRANSPORT_REQUEST)
export const fetchTransportListRequest = createAction(FETCH_TRANSPORT_LIST_REQUEST)
export const updateTransportRequest = createAction(UPDATE_TRANSPORT_REQUEST)
export const createTransportRequest = createAction(CREATE_TRANSPORT_REQUEST)
export const deleteTransportRequest = createAction(DELETE_TRANSPORT_REQUEST)
