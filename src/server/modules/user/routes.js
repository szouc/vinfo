// @flow

import { createApiRoute } from '../routes'

// API ROOT PATH - '/'

export const USER_ROOT_ROUTE = '/user'

export const USER_LICENSE_UPLOAD_ROUTE = '/license'
export const USER_ID_ROUTE = '/:username'
export const USER_RESET_PASSWORD_ROUTE = '/:username/reset_password' // Only Owner Permissions

// OUTPUT API
export const USER_ROOT_API = createApiRoute(USER_ROOT_ROUTE)
export const USER_LICENSE_UPLOAD_API = createApiRoute(USER_ROOT_ROUTE, USER_LICENSE_UPLOAD_ROUTE)
export const USER_ID_API = createApiRoute(USER_ROOT_ROUTE, USER_ID_ROUTE)
export const USER_RESET_PASSWORD_API = createApiRoute(USER_ROOT_ROUTE, USER_RESET_PASSWORD_ROUTE) // Only Owner Permissions
