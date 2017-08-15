import path from 'path'
import { createAction } from 'redux-actions'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS_REQUEST'
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE'
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE'

export const userRegisterRequest = createAction(USER_REGISTER_REQUEST)
export const userRegisterSuccess = createAction(USER_REGISTER_SUCCESS)
export const userRegisterFailure = createAction(USER_REGISTER_FAILURE)

export const userLoginRequest = createAction(USER_LOGIN_REQUEST)
export const userLoginSuccess = createAction(USER_LOGIN_SUCCESS)
export const userLoginFailure = createAction(USER_LOGIN_FAILURE)

export const userLogoutRequest = createAction(USER_LOGOUT_REQUEST)
export const userLogoutSuccess = createAction(USER_LOGOUT_SUCCESS)
export const userLogoutFailure = createAction(USER_LOGOUT_FAILURE)

const createAsyncStatus = (Action) => {
  const request = createAction(`${Action}_REQUEST`)
  const success = createAction(`${Action}_SUCCESS`)
  const failure = createAction(`${Action}_FAILURE`)

  return ({ request, success, failure })
}

const USER_LOGIN = 'USER_LOGIN'
const userLoginRequest1 = createAsyncStatus(USER_LOGIN).request
const userLoginSuccess1 = createAsyncStatus(USER_LOGIN).success
const userLoginFailure1 = createAsyncStatus(USER_LOGIN).failure

console.log(userLoginRequest1({username: 'szouc', password: '123'}))
console.log(userLoginSuccess1({username: 'szouc', password: '123'}))
console.log(userLoginFailure1({username: 'szouc', password: '123'}))

const AUTH_ROUTE = '/auth/login'
const WEB_ADDR = 'http://127.0.0.1'

console.log(`${WEB_ADDR}${AUTH_ROUTE}`)
