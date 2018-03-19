import addPrefix from '@clientUtils/addPrefix'

export const MODULE_NAME = 'COMPANY'
const addCompanyPrefix = addPrefix(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = addCompanyPrefix('SET_LOADING')
export const SHOW_DETAIL = addCompanyPrefix('SHOW_DETAIL')
export const SET_PAGINATION = addCompanyPrefix('SET_PAGINATION')
export const FETCH_LIST_REQUEST = addCompanyPrefix('FETCH_LIST_REQUEST')
export const FETCH_LIST_SUCCESS = addCompanyPrefix('FETCH_LIST_SUCCESS')
export const FETCH_ALL_REQUEST = addCompanyPrefix('FETCH_ALL_REQUEST')
export const FETCH_ALL_SUCCESS = addCompanyPrefix('FETCH_ALL_SUCCESS')
export const CREATE_REQUEST = addCompanyPrefix('CREATE_REQUEST')
export const CREATE_SUCCESS = addCompanyPrefix('CREATE_SUCCESS')
export const UPDATE_REQUEST = addCompanyPrefix('UPDATE_REQUEST')
export const UPDATE_SUCCESS = addCompanyPrefix('UPDATE_SUCCESS')
export const DELETE_REQUEST = addCompanyPrefix('DELETE_REQUEST')
export const DELETE_SUCCESS = addCompanyPrefix('DELETE_SUCCESS')
