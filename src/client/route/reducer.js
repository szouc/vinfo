// @flow

/**
 * react-router-redux 'routeReducer' doesnt support immutable.js, create a custom reducer
 */
import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
  LOCATION_CHANGE
} from 'react-router-redux'

const initialState: Immut = Immutable.fromJS({
  location: null
})

const routeReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('location', Immutable.fromJS(action.payload))
  }
  return state
}

export default routeReducer
