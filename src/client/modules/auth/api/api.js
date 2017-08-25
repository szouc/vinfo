import {
  auth, user
} from '../../../../server/exports/api'

const LOGIN_API = auth.LOGIN_API
const LOGOUT_API = auth.LOGOUT_API
const GET_USER_BY_USERNAME_API = user.GET_USER_BY_USERNAME_API

export {
  LOGIN_API,
  LOGOUT_API,
  GET_USER_BY_USERNAME_API
}
