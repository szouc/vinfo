import { createAction } from 'redux-actions'
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  FETCH_PROFILE_REQUEST
} from './actionTypes'

export const loginRequest = createAction(LOGIN_REQUEST)
export const logoutRequest = createAction(LOGOUT_REQUEST)
export const registerRequest = createAction(REGISTER_REQUEST)
export const fetchProfileRequest = createAction(FETCH_PROFILE_REQUEST)
