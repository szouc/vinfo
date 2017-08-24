// @flow

import createRoute from '../utils/createRoute'

// AUTH PATH
export const AUTH_ROOT_ROUTE = '/auth'

export const REGISTER_ROUTE = '/register'
export const LOGIN_ROUTE = '/login'
export const LOGOUT_ROUTE = '/logout'
export const RESET_PASSWORD_ROUTE = '/reset_password' // Only Manager Permissions

// OUTPUT API ROUTES
const createAuthRoute = createRoute(AUTH_ROOT_ROUTE)
export const REGISTER_API = createAuthRoute(REGISTER_ROUTE)
export const LOGIN_API = createAuthRoute(LOGIN_ROUTE)
export const LOGOUT_API = createAuthRoute(LOGOUT_ROUTE)
export const RESET_PASSWORD_API = createAuthRoute(RESET_PASSWORD_ROUTE) // Only Manager Permissions

