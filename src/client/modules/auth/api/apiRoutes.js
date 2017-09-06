import {
  auth, user
} from '@server/exports/api'

import addHostAddr from '@clientUtils/addHostAddr'

const LOGIN_API = addHostAddr(auth.LOGIN_API)
const LOGOUT_API = addHostAddr(auth.LOGOUT_API)
const GET_USER_BY_USERNAME_API = addHostAddr(user.GET_USER_BY_USERNAME_API)

export {
  LOGIN_API,
  LOGOUT_API,
  GET_USER_BY_USERNAME_API
}
