// @flow

import { createAction } from 'redux-actions'
import * as Type from './actionTypes'

export const fetchUserRequest = createAction(Type.FETCH_REQUEST)
export const fetchUserAllRequest = createAction(Type.FETCH_ALL_REQUEST)
export const fetchUserListRequest = createAction(Type.FETCH_LIST_REQUEST)
export const updateUserRequest = createAction(Type.UPDATE_REQUEST)
export const createUserRequest = createAction(Type.CREATE_REQUEST)
export const deleteUserRequest = createAction(Type.DELETE_REQUEST)
export const resetPasswordRequest = createAction(Type.RESET_PASSWORD_REQUEST)
