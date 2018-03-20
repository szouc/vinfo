// @flow

import * as Api from './api'
import * as Type from './actionTypes'

import { ADD_TRANSPORT_ENTITY, DELETE_ENTITY } from '../entity/actionTypes'
import { call, fork, put, take } from 'redux-saga/effects'

// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import Machine from '@clientUtils/machine'
import { REQUEST_ERROR } from '../error/actionTypes'
import { TRANSPORT_STATE_KEY } from '@clientSettings/schema'

const transportState = {
  currentState: 'screen',
  states: {
    screen: {
      create: 'loading',
      fetch: 'loading',
      fetchAll: 'loading',
      update: 'loading',
      delete: 'loading'
    },
    loading: {
      success: 'screen',
      failure: 'error'
    },
    error: {
      retry: 'screen'
    }
  }
}

function * screenEffect(scope, action, data, pagination = {}) {
  switch (action) {
    case 'create':
      yield put({
        type: ADD_TRANSPORT_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.CREATE_SUCCESS,
        payload: data.get('result')
      })
      break
    case 'fetch':
      yield put({
        type: ADD_TRANSPORT_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.FETCH_LIST_SUCCESS,
        payload: data.get('result')
      })
      yield put({
        type: Type.SET_PAGINATION,
        payload: pagination
      })
      break
    case 'fetchAll':
      yield put({
        type: ADD_TRANSPORT_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.FETCH_ALL_SUCCESS,
        payload: data.get('result')
      })
      break
    case 'delete':
      yield put({
        type: Type.DELETE_SUCCESS,
        payload: data.get('id')
      })
      yield put({
        type: DELETE_ENTITY,
        payload: { stateKey: TRANSPORT_STATE_KEY, id: data.get('id') }
      })
      break
    case 'update':
      yield put({
        type: ADD_TRANSPORT_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.UPDATE_SUCCESS,
        payload: data.get('result')
      })
      break
    default:
      yield put({
        type: REQUEST_ERROR,
        payload: fromJS({ message: '没有相应的操作。' })
      })
      break
  }
  yield put({
    type: Type.SET_LOADING,
    payload: { scope: scope, loading: false }
  })
}

function * loadingEffect(scope) {
  yield put({
    type: Type.SET_LOADING,
    payload: { scope: scope, loading: true }
  })
}

function * errorEffect(scope, error) {
  yield put({ type: REQUEST_ERROR, payload: fromJS(error) })
  yield put({
    type: Type.SET_LOADING,
    payload: { scope: scope, loading: false }
  })
}

const transportEffects = {
  loading: loadingEffect,
  error: errorEffect,
  screen: screenEffect
}

const machine = new Machine(transportState, transportEffects)
// const fetchEffect = machine.getEffect('fetch')
// const fetchAllEffect = machine.getEffect('fetchAll')
const createEffect = machine.getEffect('create')
// const deleteEffect = machine.getEffect('delete')
// const updateEffect = machine.getEffect('update')
const successEffect = machine.getEffect('success')
const failureEffect = machine.getEffect('failure')

function * createTransportFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      Type.CREATE_REQUEST
    )
    yield createEffect('form')
    try {
      const response = yield call(Api.createTransport, action.payload)
      if (response) {
        yield successEffect('from', 'create', response)
      }
    } catch (error) {
      yield failureEffect('form', error)
      machine.operation('retry')
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
