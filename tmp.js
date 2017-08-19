// import { createAction } from 'redux-actions'
import Immutable from 'immutable'

const loginData = Immutable.fromJS({
  username: 'szouc',
  password: '123'
})

const {username, password} = loginData.toJS()

console.log(username + password)

const AUTH_ROUTE = '/auth/login'
const WEB_ADDR = 'http://127.0.0.1'

console.log(`${WEB_ADDR}${AUTH_ROUTE}`)

const createRootRoute = (rootPath) => (...relativePath) => {
  return rootPath + relativePath.reduce((pre, cur) => pre + cur)
}

export const RELATIVE_ROOT_ROUTE = '/'

// AUTH PATH
export const AUTH_ROOT_ROUTE = '/auth'
const createAuthRoute = createRootRoute(AUTH_ROOT_ROUTE)

export const RELATIVE_AUTH_REGISTER_ROUTE = '/register'
export const RELATIVE_AUTH_LOGIN_ROUTE = '/login'
export const RELATIVE_AUTH_LOGOUT_ROUTE = '/logout'
export const RELATIVE_AUTH_RESET_PASSWORD_ROUTE = '/reset_password' // Only Manager Permissions
export const AUTH_REGISTER_ROUTE = createAuthRoute(RELATIVE_AUTH_REGISTER_ROUTE)
export const AUTH_LOGIN_ROUTE = createAuthRoute(RELATIVE_AUTH_LOGIN_ROUTE)
export const AUTH_LOGOUT_ROUTE = createAuthRoute(RELATIVE_AUTH_LOGOUT_ROUTE)
export const AUTH_RESET_PASSWORD_ROUTE = createAuthRoute(RELATIVE_AUTH_RESET_PASSWORD_ROUTE) // Only Manager Permissions

// API ROOT PATH - '/'
export const API_ROOT_ROUTE = '/api'
const createApiRoute = createRootRoute(API_ROOT_ROUTE)

export const RELATIVE_API_USER_ROOT_ROUTE = '/user'
export const API_USER_ROOT_ROUTE = createApiRoute(RELATIVE_API_USER_ROOT_ROUTE)

export const RELATIVE_USER_RESET_PASSWORD_ROUTE = '/:username/reset_password' // Only Owner Permissions
export const RELATIVE_GET_USER_BY_USERNAME_ROUTE = '/:username'
export const USER_RESET_PASSWORD_ROUTE = createApiRoute(RELATIVE_API_USER_ROOT_ROUTE, RELATIVE_USER_RESET_PASSWORD_ROUTE) // Only Owner Permissions
export const GET_USER_BY_USERNAME_ROUTE = createApiRoute(RELATIVE_API_USER_ROOT_ROUTE, RELATIVE_GET_USER_BY_USERNAME_ROUTE)

console.log(API_ROOT_ROUTE + RELATIVE_API_USER_ROOT_ROUTE)
console.log(API_USER_ROOT_ROUTE)
const user = 'szouc'
console.log(GET_USER_BY_USERNAME_ROUTE.replace(/:username/, user))
console.log(AUTH_LOGOUT_ROUTE)
