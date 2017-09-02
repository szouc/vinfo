// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS
  // FETCH_COMPANY_LIST_REQUEST,
  // FETCH_COMPANY_LIST_SUCCESS
} from './actionTypes'

import { call, put, take, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'

import * as Api from './api'

function * createCompanyFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      CREATE_COMPANY_REQUEST
    )
    const name: string = action.payload.get('name')
    const addr: string = action.payload.get('addr')
    yield put({
      type: SET_LOADING,
      payload: { scope: 'create', loading: true }
    })
    try {
      const company = yield call(Api.createCompany, { name, addr })
      if (company) {
        yield put({ type: CREATE_COMPANY_SUCCESS, payload: company })
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

// function * fetchAllCompanyFlow() {
//   while (true) {
//     const action: { type: string, payload: Immut } = yield take(
//       FETCH_COMPANY_LIST_REQUEST
//     )
//     const name: string = action.payload.get('name')
//     const addr: string = action.payload.get('addr')
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'create', loading: true }
//     })
//     try {
//       const company = yield call(Api.createCompany, { name, addr })
//       if (company) {
//         yield put({ type: CREATE_COMPANY_SUCCESS, payload: company })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield put({
//         type: SET_LOADING,
//         payload: { scope: 'create', loading: false }
//       })
//       yield delay(2000)
//       yield put({ type: REQUEST_ERROR, payload: '' })
//     }
//   }
// }

export default function * rootSagas(): any {
  yield fork(createCompanyFlow)
}
