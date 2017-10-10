// import { MODULE_NAME } from './index'

const defineModule = module => (...constant) => {
  const SEPARATOR = '/'
  return [module, ...constant].join(SEPARATOR)
}

export const MODULE_NAME = 'transport'
const defineConstant = defineModule(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = defineConstant('SET_LOADING')
export const REQUEST_ERROR = defineConstant('REQUEST_ERROR')

export const FETCH_TRANSPORT_LIST_REQUEST = defineConstant('FETCH_TRANSPORT_LIST_REQUEST')
export const FETCH_TRANSPORT_LIST_SUCCESS = defineConstant('FETCH_TRANSPORT_LIST_SUCCESS')
export const FETCH_TRANSPORT_REQUEST = defineConstant('FETCH_TRANSPORT_REQUEST')
export const FETCH_TRANSPORT_SUCCESS = defineConstant('FETCH_TRANSPORT_SUCCESS')
export const UPDATE_TRANSPORT_REQUEST = defineConstant('UPDATE_TRANSPORT_REQUEST')
export const UPDATE_TRANSPORT_SUCCESS = defineConstant('UPDATE_TRANSPORT_SUCCESS')
export const CREATE_TRANSPORT_REQUEST = defineConstant('CREATE_TRANSPORT_REQUEST')
export const CREATE_TRANSPORT_SUCCESS = defineConstant('CREATE_TRANSPORT_SUCCESS')
export const DELETE_TRANSPORT_REQUEST = defineConstant('DELETE_TRANSPORT_REQUEST')
export const DELETE_TRANSPORT_SUCCESS = defineConstant('DELETE_TRANSPORT_SUCCESS')
