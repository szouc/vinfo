// @flow

import createPath from '../utils/createPath'
import * as Route from './routes'

// OUTPUT API ROUTES
const createAuthPath = createPath(Route.AUTH_ROOT)

export const REGISTER = createAuthPath(Route.REGISTER)
export const LOGIN = createAuthPath(Route.LOGIN)
export const LOGOUT = createAuthPath(Route.LOGOUT)
export const RESET_PASSWORD = createAuthPath(Route.RESET_PASSWORD) // Only Manager Permissions
