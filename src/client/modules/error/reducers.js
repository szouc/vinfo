// @flow

import type { fromJS as Immut } from 'immutable'
import Immutable from 'immutable'
import { REQUEST_ERROR, CLEAR_ERROR } from './actionTypes'

const initialState = Immutable.fromJS({})

const errorReducer = (
  state: Immut = initialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST_ERROR:
      return state.merge(payload)
    case CLEAR_ERROR:
      return state.clear()
    default:
      return state
  }
}

export default errorReducer
