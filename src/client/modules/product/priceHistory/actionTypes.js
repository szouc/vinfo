
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

export const FETCH_PRICE_HISTORY_LIST_SUCCESS = defineConstant('FETCH_PRICE_HISTORY_LIST_SUCCESS')
export const FETCH_PRICE_HISTORY_LIST_REQUEST = defineConstant('FETCH_PRICE_HISTORY_LIST_REQUEST')
export const CREATE_PRICE_HISTORY_REQUEST = defineConstant('CREATE_PRICE_HISTORY_REQUEST')
export const CREATE_PRICE_HISTORY_SUCCESS = defineConstant('CREATE_PRICE_HISTORY_SUCCESS')
export const DELETE_PRICE_HISTORY_REQUEST = defineConstant('DELETE_PRICE_HISTORY_REQUEST')
export const DELETE_PRICE_HISTORY_SUCCESS = defineConstant('DELETE_PRICE_HISTORY_SUCCESS')
