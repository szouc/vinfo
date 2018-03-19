import addPrefix from '@clientUtils/addPrefix'

export const MODULE_NAME = 'PRODUCT'
const addProductPrefix = addPrefix(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = addProductPrefix('SET_LOADING')
export const SHOW_DETAIL_ = addProductPrefix('SHOW_DETAIL_')
export const SET_PAGINATION = addProductPrefix('SET_PAGINATION')
export const FETCH_LIST_REQUEST = addProductPrefix('FETCH_LIST_REQUEST')
export const FETCH_LIST_SUCCESS = addProductPrefix('FETCH_LIST_SUCCESS')
export const FETCH_ALL_REQUEST = addProductPrefix('FETCH_ALL_REQUEST')
export const FETCH_ALL_SUCCESS = addProductPrefix('FETCH_ALL_SUCCESS')
export const CREATE_REQUEST = addProductPrefix('CREATE_REQUEST')
export const CREATE_SUCCESS = addProductPrefix('CREATE_SUCCESS')
export const UPDATE_REQUEST = addProductPrefix('UPDATE_REQUEST')
export const UPDATE_SUCCESS = addProductPrefix('UPDATE_SUCCESS')
export const DELETE_REQUEST = addProductPrefix('DELETE_REQUEST')
export const DELETE_SUCCESS = addProductPrefix('DELETE_SUCCESS')
export const FETCH_PRICE_HISTORY_LIST_SUCCESS = addProductPrefix(
  'FETCH_PRICE_HISTORY_LIST_SUCCESS'
)
export const FETCH_PRICE_HISTORY_LIST_REQUEST = addProductPrefix(
  'FETCH_PRICE_HISTORY_LIST_REQUEST'
)
export const CREATE_PRICE_HISTORY_REQUEST = addProductPrefix(
  'CREATE_PRICE_HISTORY_REQUEST'
)
export const CREATE_PRICE_HISTORY_SUCCESS = addProductPrefix(
  'CREATE_PRICE_HISTORY_SUCCESS'
)
export const DELETE_PRICE_HISTORY_REQUEST = addProductPrefix(
  'DELETE_PRICE_HISTORY_REQUEST'
)
export const DELETE_PRICE_HISTORY_SUCCESS = addProductPrefix(
  'DELETE_PRICE_HISTORY_SUCCESS'
)
