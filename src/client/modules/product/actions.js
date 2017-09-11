// @flow

import { createAction } from 'redux-actions'
import {
  CREATE_PRODUCT_REQUEST,
  FETCH_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  FETCH_PRODUCT_LIST_REQUEST,
  CREATE_PRICE_HISTORY_REQUEST,
  DELETE_PRICE_HISTORY_REQUEST,
  FETCH_PRICE_HISTORY_LIST_REQUEST
} from './actionTypes'

export const fetchProductListRequest = createAction(FETCH_PRODUCT_LIST_REQUEST)
export const createProductRequest = createAction(CREATE_PRODUCT_REQUEST)
export const fetchProductRequest = createAction(FETCH_PRODUCT_REQUEST)
export const updateProductRequest = createAction(UPDATE_PRODUCT_REQUEST)
export const deleteProductRequest = createAction(DELETE_PRODUCT_REQUEST)
export const fetchPriceHistoryListRequest = createAction(FETCH_PRICE_HISTORY_LIST_REQUEST)
export const createPriceHistoryRequest = createAction(CREATE_PRICE_HISTORY_REQUEST)
export const deletePriceHistoryRequest = createAction(DELETE_PRICE_HISTORY_REQUEST)
