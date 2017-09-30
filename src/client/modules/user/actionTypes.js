// import { MODULE_NAME } from './'

const defineModule = module => (...constant) => {
  const SEPARATOR = '/'
  return [module, ...constant].join(SEPARATOR)
}

export const MODULE_NAME = 'user'
const defineConstant = defineModule(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = defineConstant('SET_LOADING')
export const REQUEST_ERROR = defineConstant('REQUEST_ERROR')
export const SHOW_DETAIL_USER = defineConstant('SHOW_DETAIL_USER')

export const FETCH_USER_LIST_REQUEST = defineConstant('FETCH_USER_LIST_REQUEST')
export const FETCH_USER_LIST_SUCCESS = defineConstant('FETCH_USER_LIST_SUCCESS')
export const FETCH_USER_REQUEST = defineConstant('FETCH_USER_REQUEST')
export const FETCH_USER_SUCCESS = defineConstant('FETCH_USER_SUCCESS')
export const CREATE_USER_REQUEST = defineConstant('CREATE_USER_REQUEST')
export const CREATE_USER_SUCCESS = defineConstant('CREATE_USER_SUCCESS')
export const DELETE_USER_REQUEST = defineConstant('DELETE_USER_REQUEST')
export const DELETE_USER_SUCCESS = defineConstant('DELETE_USER_SUCCESS')
export const RESET_PASSWORD_REQUEST = defineConstant('RESET_PASSWORD_REQUEST')
export const RESET_PASSWORD_SUCCESS = defineConstant('RESET_PASSWORD_SUCCESS')
export const UPDATE_USER_REQUEST = defineConstant('UPDATE_USER_REQUEST')
export const UPDATE_USER_SUCCESS = defineConstant('UPDATE_USER_SUCCESS')
