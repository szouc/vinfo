// @flow

import * as Api from './api'
import * as Type from './actionTypes'

import { ADD_USER_ENTITY, DELETE_ENTITY } from '../entity/actionTypes'
import { call, fork, put, take } from 'redux-saga/effects'

// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'
import Machine from '@clientUtils/machine'
import { REQUEST_ERROR } from '../error/actionTypes'
import { USER_STATE_KEY } from '@clientSettings/schema'
import { fromJS } from 'immutable'

const userState = {
  currentState: 'screen',
  states: {
    screen: {
      fetch: 'loading',
      create: 'loading',
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
        type: ADD_USER_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.CREATE_SUCCESS,
        payload: data.get('result')
      })
      break
    case 'fetch':
      yield put({
        type: ADD_USER_ENTITY,
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
        type: ADD_USER_ENTITY,
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
        payload: data.get('username')
      })
      yield put({
        type: DELETE_ENTITY,
        payload: { stateKey: USER_STATE_KEY, username: data.get('username') }
      })
      break
    case 'update':
      yield put({
        type: ADD_USER_ENTITY,
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
  yield put({
    type: REQUEST_ERROR,
    payload: fromJS({ errorScope: 'User', message: error.message })
  })
  yield put({
    type: Type.SET_LOADING,
    payload: { scope: scope, loading: false }
  })
}

const userEffects = {
  loading: loadingEffect,
  error: errorEffect,
  screen: screenEffect
}

const machine = new Machine(userState, userEffects)
const fetchEffect = machine.getEffect('fetch')
const fetchAllEffect = machine.getEffect('fetchAll')
const createEffect = machine.getEffect('create')
const deleteEffect = machine.getEffect('delete')
const updateEffect = machine.getEffect('update')
const successEffect = machine.getEffect('success')
const failureEffect = machine.getEffect('failure')

function * createUserFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      Type.CREATE_REQUEST
    )
    yield createEffect('form')
    try {
      const user = yield call(Api.createUser, action.payload)
      if (user) {
        yield successEffect('form', 'create', user)
      }
    } catch (error) {
      yield failureEffect('form', error)
      machine.operation('retry')
    }
  }
}

function * fetchAllUsersFlow() {
  while (true) {
    yield take(Type.FETCH_ALL_REQUEST)
    yield fetchAllEffect('list')
    try {
      const response = yield call(Api.getAllUsers)
      if (response) {
        yield successEffect('list', 'fetchAll', response)
      }
    } catch (error) {
      yield failureEffect('list', error)
      machine.operation('retry')
    }
  }
}

function * fetchUsersFlow() {
  while (true) {
    const action: { type: String, payload?: Immut } = yield take(
      Type.FETCH_LIST_REQUEST
    )
    yield fetchEffect('list')
    try {
      const result = yield call(Api.getUsersWithPg, action.payload)
      if (result) {
        const user = result.get('user')
        const pagination = result.get('pagination')
        yield successEffect('list', 'fetch', user, pagination)
      }
    } catch (error) {
      yield failureEffect('list', error)
      machine.operation('retry')
    }
  }
}

function * deleteUserByUsernameFlow() {
  while (true) {
    const action: { type: string, payload: string } = yield take(
      Type.DELETE_REQUEST
    )
    const { payload } = action
    yield deleteEffect('list')
    try {
      const response = yield call(Api.deleteUserByUsername, payload)
      if (response) {
        yield successEffect('list', 'delete', response)
      }
    } catch (error) {
      yield failureEffect('list', error)
      machine.operation('retry')
    }
  }
}

function * updateUserByUsernameFlow() {
  while (true) {
    const action: { type: string, payload: any } = yield take(
      Type.UPDATE_REQUEST
    )
    const { payload } = action
    yield updateEffect('formUpdate')
    try {
      const response = yield call(Api.updateUserByUsername, payload)
      if (response) {
        yield successEffect('formUpdate', 'update', response)
      }
    } catch (error) {
      yield failureEffect('formUpdate', error)
      machine.operation('retry')
    }
  }
}

/**
 * UserSelect SAGA
 */

function * fetchDriversFlow() {
  while (true) {
    const action: { type: String, payload?: Immut } = yield take(
      Type.FETCH_DRIVER_REQUEST
    )
    try {
      const result = yield call(Api.getUsersWithPg, action.payload)
      if (result) {
        const user = result.get('user')
        const pagination = result.get('pagination')
        yield put({
          type: ADD_USER_ENTITY,
          payload: user.get('entities')
        })
        yield put({
          type: Type.FETCH_DRIVER_SUCCESS,
          payload: user.get('result')
        })
        yield put({
          type: Type.SET_PAGINATION,
          payload: pagination
        })
      }
    } catch (error) {
      yield put({
        type: REQUEST_ERROR,
        payload: fromJS({ errorScope: 'UserSelect', message: error.message })
      })
    }
  }
}

function * fetchCaptainsFlow() {
  while (true) {
    const action: { type: String, payload?: Immut } = yield take(
      Type.FETCH_CAPTAIN_REQUEST
    )
    try {
      const result = yield call(Api.getUsersWithPg, action.payload)
      if (result) {
        const user = result.get('user')
        const pagination = result.get('pagination')
        yield put({
          type: ADD_USER_ENTITY,
          payload: user.get('entities')
        })
        yield put({
          type: Type.FETCH_CAPTAIN_SUCCESS,
          payload: user.get('result')
        })
        yield put({
          type: Type.SET_PAGINATION,
          payload: pagination
        })
      }
    } catch (error) {
      yield put({
        type: REQUEST_ERROR,
        payload: fromJS({ errorScope: 'UserSelect', message: error.message })
      })
    }
  }
}

export default function * rootSagas(): any {
  yield fork(createUserFlow)
  yield fork(fetchAllUsersFlow)
  yield fork(fetchUsersFlow)
  yield fork(deleteUserByUsernameFlow)
  yield fork(updateUserByUsernameFlow)
  yield fork(fetchDriversFlow)
  yield fork(fetchCaptainsFlow)
}
