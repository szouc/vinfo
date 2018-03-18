// @flow

import { createAction } from 'redux-actions'
import * as Type from './actionTypes'

export const fetchUserRequest = createAction(Type.FETCH_USER_REQUEST)
export const fetchUserAllRequest = createAction(Type.FETCH_USER_ALL_REQUEST)
export const fetchUserListRequest = createAction(Type.FETCH_USER_LIST_REQUEST)
export const updateUserRequest = createAction(Type.UPDATE_USER_REQUEST)
export const createUserRequest = createAction(Type.CREATE_USER_REQUEST)
export const deleteUserRequest = createAction(Type.DELETE_USER_REQUEST)
export const resetPasswordRequest = createAction(Type.RESET_PASSWORD_REQUEST)
