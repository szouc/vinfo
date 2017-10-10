// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  // FETCH_TRANSPORT_TRANSPORTQUEST,
  // FETCH_TRANSPORT_LIST_SUCCESS,
  // DELETE_TRANSPORT_REQUEST,
  // DELETE_TRANSPORT_SUCCESS,
  // FETCH_TRANSPORT_REQUEST,
  // FETCH_TRANSPORT_SUCCESS,
  CREATE_TRANSPORT_REQUEST,
  CREATE_TRANSPORT_SUCCESS
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

function * createTransportFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      CREATE_TRANSPORT_REQUEST
    )
    yield put({
      type: SET_LOADING,
      payload: { scope: 'create', loading: true }
    })
    try {
      const response = yield call(Api.createTransport, action.payload)
      if (response) {
        yield put({ type: CREATE_TRANSPORT_SUCCESS, payload: response })
      }
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
    } finally {
      yield fork(clearLoadingAndError, 'create')
    }
  }
}

// function * fetchAllVehiclesFlow() {
//   while (true) {
//     yield take(FETCH_VEHICLE_LIST_REQUEST)
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'fetchList', loading: true }
//     })
//     try {
//       const response = yield call(Api.getAllVehicles)
//       if (response) {
//         yield put({ type: FETCH_VEHICLE_LIST_SUCCESS, payload: response })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield fork(clearLoadingAndError, 'fetchList')
//     }
//   }
// }

// function * deleteVehicleByIdFlow() {
//   while (true) {
//     const action: { type: string, payload: string } = yield take(
//       DELETE_VEHICLE_REQUEST
//     )
//     const { payload } = action
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'delete', loading: true }
//     })
//     try {
//       const response = yield call(Api.deleteVehicleById, payload)
//       if (response) {
//         yield put({
//           type: DELETE_VEHICLE_SUCCESS,
//           payload: response
//         })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield fork(clearLoadingAndError, 'delete')
//     }
//   }
// }

// function * updateVehicleByIdFlow() {
//   while (true) {
//     const action: { type: string, payload: any } = yield take(
//       UPDATE_VEHICLE_REQUEST
//     )
//     const { payload } = action
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'update', loading: true }
//     })
//     try {
//       const response = yield call(Api.updateVehicleById, payload)
//       if (response) {
//         yield put({
//           type: UPDATE_VEHICLE_SUCCESS,
//           payload: response
//         })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield fork(clearLoadingAndError, 'update')
//     }
//   }
// }

// function * createVehicleFuelFlow() {
//   while (true) {
//     const action: { type: string, payload: Immut } = yield take(
//       CREATE_FUEL_REQUEST
//     )
//     yield put({
//       type: SET_LOADING,
//       payload: { scope: 'createFuel', loading: true }
//     })
//     try {
//       const response = yield call(Api.createVehicleFuel, action.payload)
//       if (response) {
//         yield put({ type: CREATE_FUEL_SUCCESS, payload: response })
//       }
//     } catch (error) {
//       yield put({ type: REQUEST_ERROR, payload: error.message })
//     } finally {
//       yield fork(clearLoadingAndError, 'createFuel')
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
//     })Vehicle try {
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

export default function * rootSagas(): any {
  yield fork(createTransportFlow)
}
