import { createAction } from 'redux-actions'
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  FETCH_PROFILE_REQUEST
} from '../constants/login'

export const loginRequest = createAction(LOGIN_REQUEST.ACTION)
export const logoutRequest = createAction(LOGOUT_REQUEST.ACTION)
export const registerRequest = createAction(REGISTER_REQUEST.ACTION)
export const fetchProfileRequest = createAction(FETCH_PROFILE_REQUEST.ACTION)
