// @flow

import { createAction } from 'redux-actions'
import {
  FETCH_USER_REQUEST,
  FETCH_USER_LIST_REQUEST,
  UPDATE_USER_REQUEST,
  CREATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  RESET_PASSWORD_REQUEST
} from './actionTypes'

export const fetchUserRequest = createAction(FETCH_USER_REQUEST)
export const fetchUserListRequest = createAction(FETCH_USER_LIST_REQUEST)
export const updateUserRequest = createAction(UPDATE_USER_REQUEST)
export const createUserRequest = createAction(CREATE_USER_REQUEST)
export const deleteUserRequest = createAction(DELETE_USER_REQUEST)
export const resetPasswordRequest = createAction(RESET_PASSWORD_REQUEST)
