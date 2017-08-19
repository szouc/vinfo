// @flow

/*
  example usages:
  const usersReducer = combineReducers({
    usersData: usersDataReducer,
    paginationData: paginationReducerFor('USERS_'),
  });
  const domainsReducer = combineReducers({
    domainsData: domainsDataReducer,
    paginationData: paginationReducerFor('DOMAINS_'),
  });
 */

import type { fromJS as Immut } from 'immutable'
import Immutable from 'immutable'
import SET_PAGINATION from '../actions'

const initialState = Immutable.fromJS({
  startElement: 0,
  pageSize: 50,
  count: 0
})

export const paginationReducerFor = (prefix: string) => {
  const paginationReducer = (state: Immut = initialState, action: { type: string, payload: any}) => {
    const { type, payload } = action
    switch (type) {
      case prefix + SET_PAGINATION:
        const {
          startElement,
          pageSize,
          count
        } = payload
        return state.set('startElement', startElement)
          .set('pageSize', pageSize)
          .set('count', count)
      default:
        return state
    }
  }
  return paginationReducer
}
