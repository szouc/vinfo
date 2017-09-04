// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  // FETCH_PRODUCT_LIST_REQUEST,
  // FETCH_PRODUCT_LIST_SUCCESS,
  // DELETE_PRODUCT_REQUEST,
  // DELETE_PRODUCT_SUCCESS,
  // UPDATE_PRODUCT_REQUEST,
  // UPDATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS
} from './actionTypes'

import { call, put, take, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'

import * as Api from './api'
import { saga as priceHistorySagas } from './priceHistory'

function * createProductFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      CREATE_PRODUCT_REQUEST
    )
    yield put({
      type: SET_LOADING,
      payload: { scope: 'create', loading: true }
    })
    try {
      const product = yield call(Api.createProduct, action.payload)
      if (product) {
        yield put({ type: CREATE_PRODUCT_SUCCESS, payload: product })
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

// function * fetchAllCompaniesFlow() {
//   while (true) {
//     yield take(FETCH_COMPANY_LIST_REQUEST)
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'fetchList', loading: true }
//     })
//     try {
//       const company = yield call(Api.getAllCompanies)
//       if (company) {
//         yield put({ type: FETCH_COMPANY_LIST_SUCCESS, payload: company })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield put({
//         type: SET_LOADING,
//         payload: { scope: 'fetchList', loading: false }
//       })
//       yield delay(2000)
//       yield put({ type: REQUEST_ERROR, payload: '' })
//     }
//   }
// }

// function * deleteCompanyByIdFlow() {
//   while (true) {
//     const action: { type: string, payload: string } = yield take(
//       DELETE_COMPANY_REQUEST
//     )
//     const { payload } = action
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'delete', loading: true }
//     })
//     try {
//       const company = yield call(Api.deleteCompanyById, payload)
//       if (company) {
//         yield put({
//           type: DELETE_COMPANY_SUCCESS,
//           payload: company.get('result')
//         })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield put({
//         type: SET_LOADING,
//         payload: { scope: 'delete', loading: false }
//       })
//       yield delay(2000)
//       yield put({ type: REQUEST_ERROR, payload: '' })
//     }
//   }
// }

export default function * rootSagas(): any {
  yield fork(createProductFlow)
  yield fork(priceHistorySagas)
  // yield fork(deleteCompanyByIdFlow)
}
