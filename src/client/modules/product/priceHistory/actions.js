// @flow

import { createAction } from 'redux-actions'
import {
  CREATE_PRICE_HISTORY_REQUEST,
  DELETE_PRICE_HISTORY_REQUEST,
  FETCH_PRICE_HISTORY_LIST_REQUEST
} from './actionTypes'

export const fetchPriceHistoryListRequest = createAction(FETCH_PRICE_HISTORY_LIST_REQUEST)
export const createPriceHistoryRequest = createAction(CREATE_PRICE_HISTORY_REQUEST)
export const deletePriceHistoryRequest = createAction(DELETE_PRICE_HISTORY_REQUEST)
