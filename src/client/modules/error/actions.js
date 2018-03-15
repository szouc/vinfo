import { createAction } from 'redux-actions'
import { CLEAR_ERROR } from './actionTypes'

export const clearErrorRequest = createAction(CLEAR_ERROR)
