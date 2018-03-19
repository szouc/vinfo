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
import { SET_PAGINATION } from './actionTypes'

const initialState = Immutable.fromJS({
  pageNumber: 1,
  pageSize: 20,
  total: 0
})

const paginationReducerFor = (prefix: string) => {
  const paginationReducer = (
    state: Immut = initialState,
    action: { type: string, payload: any }
  ) => {
    const { type, payload } = action
    switch (type) {
      case `${prefix}_${SET_PAGINATION}`:
        return state.merge(payload)
      default:
        return state
    }
  }
  return paginationReducer
}

export default paginationReducerFor
