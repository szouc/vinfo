// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_SUCCESS,
  // DELETE_USER_REQUEST,
  // DELETE_USER_SUCCESS,
  // UPDATE_USER_REQUEST,
  // UPDATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS
} from './actionTypes'

import { call, put, take, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'

import * as Api from './api'

function * clearLoadingAndError(scope) {
  yield put({
    type: SET_LOADING,
    payload: { scope: scope, loading: false }
  })
  yield delay(2000)
  yield put({ type: REQUEST_ERROR, payload: '' })
}

function * createUserFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      CREATE_USER_REQUEST
    )
    yield put({
      type: SET_LOADING,
      payload: { scope: 'create', loading: true }
    })
    try {
      const user = yield call(Api.createUser, action.payload)
      if (user) {
        yield put({ type: CREATE_USER_SUCCESS, payload: user })
      }
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
    } finally {
      yield fork(clearLoadingAndError, 'create')
    }
  }
}

function * fetchAllUsersFlow() {
  while (true) {
    yield take(FETCH_USER_LIST_REQUEST)
    yield put({
      type: SET_LOADING,
      payload: { scope: 'fetchList', loading: true }
    })
    try {
      const response = yield call(Api.getAllUsers)
      if (response) {
        yield put({ type: FETCH_USER_LIST_SUCCESS, payload: response })
      }
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
    } finally {
      yield fork(clearLoadingAndError, 'fetchList')
    }
  }
}

// function * deleteProductByIdFlow() {
//   while (true) {
//     const action: { type: string, payload: string } = yield take(
//       DELETE_PRODUCT_REQUEST
//     )
//     const { payload } = action
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'delete', loading: true }
//     })
//     try {
//       const productId = yield call(Api.deleteProductById, payload)
//       if (productId) {
//         yield put({
//           type: DELETE_PRODUCT_SUCCESS,
//           payload: productId
//         })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield fork(clearLoadingAndError, 'delete')
//     }
//   }
// }

// function * createPriceHistoryFlow() {
//   while (true) {
//     const action: { type: string, payload: Immut } = yield take(
//       CREATE_PRICE_HISTORY_REQUEST
//     )
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'createPH', loading: true }
//     })
//     try {
//       const product = yield call(Api.createPriceHistory, action.payload)
//       if (product) {
//         yield put({ type: CREATE_PRICE_HISTORY_SUCCESS, payload: product })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield fork(clearLoadingAndError, 'createPH')
//     }
//   }
// }

// function * deletePriceHistoryByIdFlow() {
//   while (true) {
//     const action: { type: string, payload: any } = yield take(
//       DELETE_PRICE_HISTORY_REQUEST
//     )
//     const { payload } = action
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'deletePH', loading: true }
//     })
//     try {
//       const product = yield call(Api.deletePriceHistoryById, payload)
//       if (product) {
//         yield put({
//           type: DELETE_PRICE_HISTORY_SUCCESS,
//           payload: product
//         })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield fork(clearLoadingAndError, 'deletePH')
//     }
//   }
// }

// function * updateProductByIdFlow() {
//   while (true) {
//     const action: { type: string, payload: any } = yield take(
//       UPDATE_PRODUCT_REQUEST
//     )
//     const { payload } = action
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'update', loading: true }
//     })
//     try {
//       const product = yield call(Api.updateProductById, payload)
//       if (product) {
//         yield put({
//           type: UPDATE_PRODUCT_SUCCESS,
//           payload: product
//         })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield fork(clearLoadingAndError, 'update')
//     }
//   }
// }

export default function * rootSagas(): any {
  yield fork(createUserFlow)
  yield fork(fetchAllUsersFlow)
  // yield fork(createPriceHistoryFlow)
  // yield fork(deleteProductByIdFlow)
  // yield fork(deletePriceHistoryByIdFlow)
  // yield fork(updateProductByIdFlow)
}
