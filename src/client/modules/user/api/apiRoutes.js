import { user } from '@server/exports/api'
import addHostAddr from '@clientUtils/addHostAddr'

export const USER_ROOT_API = addHostAddr(user.USER_ROOT_API)
export const USER_ID_API = addHostAddr(user.USER_ID_API)
export const USER_RESET_PASSWORD_API = addHostAddr(user.USER_RESET_PASSWORD_API)
