// import { MODULE_NAME } from './'

const defineModule = module => (...constant) => {
  const SEPARATOR = '_'
  return [module, ...constant].join(SEPARATOR)
}

export const MODULE_NAME = 'PRODUCT'
const defineConstant = defineModule(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = defineConstant('SET_LOADING')
export const SHOW_DETAIL_PRODUCT = defineConstant('SHOW_DETAIL_PRODUCT')

export const FETCH_PRODUCT_LIST_REQUEST = defineConstant('FETCH_PRODUCT_LIST_REQUEST')
export const FETCH_PRODUCT_LIST_SUCCESS = defineConstant('FETCH_PRODUCT_LIST_SUCCESS')
export const FETCH_PRODUCT_ALL_REQUEST = defineConstant('FETCH_PRODUCT_ALL_REQUEST')
export const FETCH_PRODUCT_ALL_SUCCESS = defineConstant('FETCH_PRODUCT_ALL_SUCCESS')
export const CREATE_PRODUCT_REQUEST = defineConstant('CREATE_PRODUCT_REQUEST')
export const CREATE_PRODUCT_SUCCESS = defineConstant('CREATE_PRODUCT_SUCCESS')
export const UPDATE_PRODUCT_REQUEST = defineConstant('UPDATE_PRODUCT_REQUEST')
export const UPDATE_PRODUCT_SUCCESS = defineConstant('UPDATE_PRODUCT_SUCCESS')
export const DELETE_PRODUCT_REQUEST = defineConstant('DELETE_PRODUCT_REQUEST')
export const DELETE_PRODUCT_SUCCESS = defineConstant('DELETE_PRODUCT_SUCCESS')
export const FETCH_PRICE_HISTORY_LIST_SUCCESS = defineConstant('FETCH_PRICE_HISTORY_LIST_SUCCESS')
export const FETCH_PRICE_HISTORY_LIST_REQUEST = defineConstant('FETCH_PRICE_HISTORY_LIST_REQUEST')
export const CREATE_PRICE_HISTORY_REQUEST = defineConstant('CREATE_PRICE_HISTORY_REQUEST')
export const CREATE_PRICE_HISTORY_SUCCESS = defineConstant('CREATE_PRICE_HISTORY_SUCCESS')
export const DELETE_PRICE_HISTORY_REQUEST = defineConstant('DELETE_PRICE_HISTORY_REQUEST')
export const DELETE_PRICE_HISTORY_SUCCESS = defineConstant('DELETE_PRICE_HISTORY_SUCCESS')
