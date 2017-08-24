import { MODULE_NAME } from '../settings/config'

const defineModule = (module) => (...constant) => {
  const SEPARATOR = '/'
  return [module, ...constant].join(SEPARATOR)
}

const defineConstant = defineModule(MODULE_NAME)

export const SET_LOADING = defineConstant('SET_LOADING')
export const REQUEST_ERROR = defineConstant('REQUEST_ERROR')
export const FETCH_ORDER_REQUEST = defineConstant('FETCH_ORDER_REQUEST')
export const FETCH_ORDER_SUCCESS = defineConstant('FETCH_ORDER_SUCCESS')
export const ACCEPT_ORDER_REQUEST = defineConstant('ACCEPT_ORDER_REQUEST')
export const ACCEPT_ORDER_SUCCESS = defineConstant('ACCEPT_ORDER_SUCCESS')
export const DECLINE_ORDER_REQUEST = defineConstant('DECLINE_ORDER_REQUEST')
export const DECLINE_ORDER_SUCCESS = defineConstant('DECLINE_ORDER_SUCCESS')
export const SUBMIT_ORDER_REQUEST = defineConstant('SUBMIT_ORDER_REQUEST')
export const SUBMIT_ORDER_SUCCESS = defineConstant('SUBMIT_ORDER_SUCCESS')
