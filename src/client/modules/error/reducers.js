// @flow

import type { fromJS as Immut } from 'immutable'
import Immutable from 'immutable'
import { REQUEST_ERROR, CLEAR_ERROR } from './actionTypes'
import { message } from 'antd'

const initialState = Immutable.fromJS({})

const errorReducer = (
  state: Immut = initialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST_ERROR:
      message.error(payload.get('message'), 3)
      return state.clear().merge(payload)
    case CLEAR_ERROR:
      return state.clear()
    default:
      return state
  }
}

export default errorReducer
