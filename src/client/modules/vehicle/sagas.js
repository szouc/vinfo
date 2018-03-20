// @flow

import * as Api from './api'
import * as Type from './actionTypes'

import { ADD_VEHICLE_ENTITY, DELETE_ENTITY } from '../entity/actionTypes'
import { call, fork, put, take } from 'redux-saga/effects'

import { VEHICLE_STATE_KEY } from '@clientSettings/schema'
import type { fromJS as Immut } from 'immutable'
import Machine from '@clientUtils/machine'
import { REQUEST_ERROR } from '../error/actionTypes'
import { fromJS } from 'immutable'

// Use for redux-form/immutable

const vehicleState = {
  currentState: 'screen',
  states: {
    screen: {
      fetch: 'loading',
      fetchAll: 'loading',
      create: 'loading',
      update: 'loading',
      delete: 'loading',
      createFuel: 'loading',
      createMaintain: 'loading'
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
        type: ADD_VEHICLE_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.CREATE_SUCCESS,
        payload: data.get('result')
      })
      break
    case 'fetch':
      yield put({
        type: ADD_VEHICLE_ENTITY,
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
        type: ADD_VEHICLE_ENTITY,
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
        payload: { stateKey: VEHICLE_STATE_KEY, id: data.get('id') }
      })
      break
    case 'update':
      yield put({
        type: ADD_VEHICLE_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.UPDATE_SUCCESS,
        payload: data.get('result')
      })
      break
    case 'createFuel':
      yield put({
        type: Type.CREATE_FUEL_SUCCESS,
        payload: data.get('result')
      })
      break
    case 'createMaintain':
      yield put({
        type: Type.CREATE_MAINTAIN_SUCCESS,
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

const vehicleEffects = {
  loading: loadingEffect,
  error: errorEffect,
  screen: screenEffect
}

const machine = new Machine(vehicleState, vehicleEffects)
const fetchEffect = machine.getEffect('fetch')
const fetchAllEffect = machine.getEffect('fetchAll')
const createEffect = machine.getEffect('create')
const deleteEffect = machine.getEffect('delete')
const updateEffect = machine.getEffect('update')
const createFuelEffect = machine.getEffect('createFuel')
const createMaintainEffect = machine.getEffect('createMaintain')
const successEffect = machine.getEffect('success')
const failureEffect = machine.getEffect('failure')

function * createVehicleFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      Type.CREATE_REQUEST
    )
    yield createEffect('form')
    try {
      const vehicle = yield call(Api.createVehicle, action.payload)
      if (vehicle) {
        yield successEffect('form', 'create', vehicle)
      }
    } catch (error) {
      yield failureEffect('form', error)
      machine.operation('retry')
    }
  }
}

function * fetchAllVehiclesFlow() {
  while (true) {
    yield take(Type.FETCH_ALL_REQUEST)
    yield fetchAllEffect('list')
    try {
      const response = yield call(Api.getAllVehicles)
      if (response) {
        yield successEffect('list', 'fetchAll', response)
      }
    } catch (error) {
      yield failureEffect('list', error)
      machine.operation('retry')
    }
  }
}

function * fetchVehiclesFlow() {
  while (true) {
    const action: { type: String, payload?: Immut } = yield take(
      Type.FETCH_LIST_REQUEST
    )
    yield fetchEffect('list')
    try {
      const result = yield call(Api.getVehiclesWithPg, action.payload)
      if (result) {
        const vehicle = result.get('vehicle')
        const pagination = result.get('pagination')
        yield successEffect('list', 'fetch', vehicle, pagination)
      }
    } catch (error) {
      yield failureEffect('list', error)
      machine.operation('retry')
    }
  }
}

function * deleteVehicleByIdFlow() {
  while (true) {
    const action: { type: string, payload: string } = yield take(
      Type.DELETE_REQUEST
    )
    const { payload } = action
    yield deleteEffect('list')
    try {
      const response = yield call(Api.deleteVehicleById, payload)
      if (response) {
        yield successEffect('list', 'delete', response)
      }
    } catch (error) {
      yield failureEffect('list', error)
      machine.operation('retry')
    }
  }
}

function * updateVehicleByIdFlow() {
  while (true) {
    const action: { type: string, payload: any } = yield take(
      Type.UPDATE_REQUEST
    )
    const { payload } = action
    yield updateEffect('formUpdate')
    try {
      const response = yield call(Api.updateVehicleById, payload)
      if (response) {
        yield successEffect('formUpdate', 'update', response)
      }
    } catch (error) {
      yield failureEffect('fromUpdate', error)
      machine.operation('retry')
    }
  }
}

function * createVehicleFuelFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      Type.CREATE_FUEL_REQUEST
    )
    yield createFuelEffect('formFuel')
    try {
      const response = yield call(Api.createVehicleFuel, action.payload)
      if (response) {
        yield successEffect('formFuel', 'createFuel', response)
      }
    } catch (error) {
      yield failureEffect('formFuel', error)
      machine.operation('retry')
    }
  }
}

function * createVehicleMaintainFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      Type.CREATE_MAINTAIN_REQUEST
    )
    yield createMaintainEffect('formMaintain')
    try {
      const response = yield call(Api.createVehicleMaintain, action.payload)
      if (response) {
        yield successEffect('formMaintain', 'createMaintain', response)
      }
    } catch (error) {
      yield failureEffect('formMaintain', error)
      machine.operation('retry')
    }
  }
}
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
  yield fork(createVehicleFlow)
  yield fork(fetchAllVehiclesFlow)
  yield fork(fetchVehiclesFlow)
  yield fork(deleteVehicleByIdFlow)
  yield fork(updateVehicleByIdFlow)
  yield fork(createVehicleFuelFlow)
  yield fork(createVehicleMaintainFlow)
  // yield fork(deletePriceHistoryByIdFlow)
}
