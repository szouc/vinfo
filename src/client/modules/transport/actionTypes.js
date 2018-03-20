import addPrefix from '@clientUtils/addPrefix'
export const MODULE_NAME = 'TRANSPORT'
const addTransportPrefix = addPrefix(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = addTransportPrefix('SET_LOADING')
export const SET_PAGINATION = addTransportPrefix('SET_PAGINATION')
export const FETCH_ALL_REQUEST = addTransportPrefix('FETCH_ALL_REQUEST')
export const FETCH_ALL_SUCCESS = addTransportPrefix('FETCH_ALL_SUCCESS')
export const FETCH_LIST_REQUEST = addTransportPrefix('FETCH_LIST_REQUEST')
export const FETCH_LIST_SUCCESS = addTransportPrefix('FETCH_LIST_SUCCESS')
export const FETCH_REQUEST = addTransportPrefix('FETCH_REQUEST')
export const FETCH_SUCCESS = addTransportPrefix('FETCH_SUCCESS')
export const UPDATE_REQUEST = addTransportPrefix('UPDATE_REQUEST')
export const UPDATE_SUCCESS = addTransportPrefix('UPDATE_SUCCESS')
export const CREATE_REQUEST = addTransportPrefix('CREATE_REQUEST')
export const CREATE_SUCCESS = addTransportPrefix('CREATE_SUCCESS')
export const DELETE_REQUEST = addTransportPrefix('DELETE_REQUEST')
export const DELETE_SUCCESS = addTransportPrefix('DELETE_SUCCESS')
