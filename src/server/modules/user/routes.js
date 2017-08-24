// @flow

import { createApiRoute } from '../routes'

// API ROOT PATH - '/'

export const USER_ROOT_ROUTE = '/user'

export const USER_RESET_PASSWORD_ROUTE = '/:username/reset_password' // Only Owner Permissions
export const GET_USER_BY_USERNAME_ROUTE = '/:username'

// OUTPUT API
export const USER_ROOT_API = createApiRoute(USER_ROOT_ROUTE)
export const USER_RESET_PASSWORD_API = createApiRoute(USER_ROOT_ROUTE, USER_RESET_PASSWORD_ROUTE) // Only Owner Permissions
export const GET_USER_BY_USERNAME_API = createApiRoute(USER_ROOT_ROUTE, GET_USER_BY_USERNAME_ROUTE)
