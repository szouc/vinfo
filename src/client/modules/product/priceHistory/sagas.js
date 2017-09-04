// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_PRICE_HISTORY_REQUEST,
  CREATE_PRICE_HISTORY_SUCCESS
} from './actionTypes'

import { call, put, take, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'

import * as Api from '../api'

function * createPriceHistoryFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      CREATE_PRICE_HISTORY_REQUEST
    )
    yield put({
      type: SET_LOADING,
      payload: { scope: 'create', loading: true }
    })
    try {
      const priceHistory = yield call(Api.createPriceHistory, action.payload)
      if (priceHistory) {
        yield put({ type: CREATE_PRICE_HISTORY_SUCCESS, payload: priceHistory })
      }
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
    } finally {
      yield put({
        type: SET_LOADING,
        payload: { scope: 'create', loading: false }
      })
      yield delay(2000)
      yield put({ type: REQUEST_ERROR, payload: '' })
    }
  }
}

export default function * rootSagas(): any {
  yield fork(createPriceHistoryFlow)
  // yield fork(deleteCompanyByIdFlow)
}
