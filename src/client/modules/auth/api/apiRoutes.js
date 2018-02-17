import {
  auth, user
} from '@server/exports/api'

import addHostAddr from '@clientUtils/addHostAddr'

const LOGIN = addHostAddr(auth.LOGIN)
const LOGOUT = addHostAddr(auth.LOGOUT)
const USER_ID = addHostAddr(user.USER_ID)

export {
  LOGIN,
  LOGOUT,
  USER_ID
}
