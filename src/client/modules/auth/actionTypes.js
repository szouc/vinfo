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
export const SET_AUTH = defineConstant('SET_AUTH')
export const REQUEST_ERROR = defineConstant('REQUEST_ERROR')
export const LOGIN_REQUEST = defineConstant('LOGIN_REQUEST')
export const LOGOUT_REQUEST = defineConstant('LOGOUT_REQUEST')
export const REGISTER_REQUEST = defineConstant('REGISTER_REQUEST')
export const FETCH_PROFILE_REQUEST = defineConstant('FETCH_PROFILE_REQUEST')
export const FETCH_PROFILE_SUCCESS = defineConstant('FETCH_PROFILE_SUCCESS')
