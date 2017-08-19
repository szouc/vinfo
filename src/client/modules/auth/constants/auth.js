import { defineAction } from 'redux-define'
import { MODULE_NAME } from '../settings/config'
import { PENDING, SUCCESS, ERROR } from '../constants/asynState'

/**
 * Generating async request suffix
 */
export const LOGIN_REQUEST = defineAction('LOGIN_REQUEST', [ PENDING, SUCCESS, ERROR ], MODULE_NAME)
export const LOGOUT_REQUEST = defineAction('LOGOUT_REQUEST', [ PENDING, SUCCESS, ERROR ], MODULE_NAME)
export const REGISTER_REQUEST = defineAction('REGISTER_REQUEST', [ PENDING, SUCCESS, ERROR ], MODULE_NAME)
export const FETCH_PROFILE_REQUEST = defineAction('FETCH_PROFILE_REQUEST', [ PENDING, SUCCESS, ERROR ], MODULE_NAME)
