// @flow

import { createAction } from 'redux-actions'
import * as Type from './actionTypes'

export const fetchProductListRequest = createAction(Type.FETCH_LIST_REQUEST)
export const createProductRequest = createAction(Type.CREATE_REQUEST)
export const fetchProductAllRequest = createAction(Type.FETCH_ALL_REQUEST)
export const updateProductRequest = createAction(Type.UPDATE_REQUEST)
export const deleteProductRequest = createAction(Type.DELETE_REQUEST)
export const fetchPriceHistoryListRequest = createAction(Type.FETCH_PRICE_HISTORY_LIST_REQUEST)
export const createPriceHistoryRequest = createAction(Type.CREATE_PRICE_HISTORY_REQUEST)
export const deletePriceHistoryRequest = createAction(Type.DELETE_PRICE_HISTORY_REQUEST)
export const fetchSelectRequest = createAction(Type.FETCH_SELECT_REQUEST)
