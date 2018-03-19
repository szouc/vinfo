import addPrefix from '@clientUtils/addPrefix'

export const MODULE_NAME = 'USER'
const addUserPrefix = addPrefix(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = addUserPrefix('SET_LOADING')
export const SHOW_DETAIL = addUserPrefix('SHOW_DETAIL')
export const SET_PAGINATION = addUserPrefix('SET_PAGINATION')
export const FETCH_ALL_REQUEST = addUserPrefix('FETCH_ALL_REQUEST')
export const FETCH_ALL_SUCCESS = addUserPrefix('FETCH_ALL_SUCCESS')
export const FETCH_LIST_REQUEST = addUserPrefix('FETCH_LIST_REQUEST')
export const FETCH_LIST_SUCCESS = addUserPrefix('FETCH_LIST_SUCCESS')
export const FETCH_REQUEST = addUserPrefix('FETCH_REQUEST')
export const FETCH_SUCCESS = addUserPrefix('FETCH_SUCCESS')
export const CREATE_REQUEST = addUserPrefix('CREATE_REQUEST')
export const CREATE_SUCCESS = addUserPrefix('CREATE_SUCCESS')
export const DELETE_REQUEST = addUserPrefix('DELETE_REQUEST')
export const DELETE_SUCCESS = addUserPrefix('DELETE_SUCCESS')
export const RESET_PASSWORD_REQUEST = addUserPrefix('RESET_PASSWORD_REQUEST')
export const RESET_PASSWORD_SUCCESS = addUserPrefix('RESET_PASSWORD_SUCCESS')
export const UPDATE_REQUEST = addUserPrefix('UPDATE_REQUEST')
export const UPDATE_SUCCESS = addUserPrefix('UPDATE_SUCCESS')
