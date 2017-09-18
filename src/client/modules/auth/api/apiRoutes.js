import {
  auth, user
} from '@server/exports/api'

import addHostAddr from '@clientUtils/addHostAddr'

const LOGIN_API = addHostAddr(auth.LOGIN_API)
const LOGOUT_API = addHostAddr(auth.LOGOUT_API)
const USER_ID_API = addHostAddr(user.USER_ID_API)

export {
  LOGIN_API,
  LOGOUT_API,
  USER_ID_API
}
