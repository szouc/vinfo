
import { MODULE_NAME } from './'

const defineModule = module => (...constant) => {
  const SEPARATOR = '/'
  return [module, ...constant].join(SEPARATOR)
}

const defineConstant = defineModule(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = defineConstant('SET_LOADING')
export const REQUEST_ERROR = defineConstant('REQUEST_ERROR')
export const SHOW_DETAIL_PRODUCT = defineConstant('SHOW_DETAIL_PRODUCT')

export const FETCH_PRODUCT_LIST_REQUEST = defineConstant('FETCH_PRODUCT_LIST_REQUEST')
export const FETCH_PRODUCT_LIST_SUCCESS = defineConstant('FETCH_PRODUCT_LIST_SUCCESS')
export const FETCH_PRODUCT_REQUEST = defineConstant('FETCH_PRODUCT_REQUEST')
export const FETCH_PRODUCT_SUCCESS = defineConstant('FETCH_PRODUCT_SUCCESS')
export const CREATE_PRODUCT_REQUEST = defineConstant('CREATE_PRODUCT_REQUEST')
export const CREATE_PRODUCT_SUCCESS = defineConstant('CREATE_PRODUCT_SUCCESS')
export const UPDATE_PRODUCT_REQUEST = defineConstant('UPDATE_PRODUCT_REQUEST')
export const UPDATE_PRODUCT_SUCCESS = defineConstant('UPDATE_PRODUCT_SUCCESS')
export const DELETE_PRODUCT_REQUEST = defineConstant('DELETE_PRODUCT_REQUEST')
export const DELETE_PRODUCT_SUCCESS = defineConstant('DELETE_PRODUCT_SUCCESS')
