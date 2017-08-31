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
export const SHOW_DETAIL_COMPANY = defineConstant('SHOW_DETAIL_COMPANY')
export const FETCH_LIST_REQUEST = defineConstant('FETCH_LIST_REQUEST')
export const FETCH_LIST_SUCCESS = defineConstant('FETCH_LIST_SUCCESS')
export const CREATE_COMPANY_REQUEST = defineConstant('CREATE_COMPANY_REQUEST')
export const CREATE_COMPANY_SUCCESS = defineConstant('CREATE_COMPANY_SUCCESS')
export const UPDATE_COMPANY_REQUEST = defineConstant('UPDATE_COMPANY_REQUEST')
export const UPDATE_COMPANY_SUCCESS = defineConstant('UPDATE_COMPANY_SUCCESS')
export const DELETE_COMPANY_REQUEST = defineConstant('DELETE_COMPANY_REQUEST')
export const DELETE_COMPANY_SUCCESS = defineConstant('DELETE_COMPANY_SUCCESS')
