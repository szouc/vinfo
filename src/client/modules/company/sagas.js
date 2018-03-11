// @flow

import * as Type from './actionTypes'

import Machine from '@clientUtils/machine'
import { call, put, take, fork } from 'redux-saga/effects'
// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'

import * as Api from './api'

const companyState = {
  currentState: 'screen',
  states: {
    screen: {
      fetch: 'loading',
      create: 'loading',
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

function * screenEffect(scope, data, pagination = {}) {
  switch (scope) {
    case 'create':
      yield put({
        type: Type.CREATE_COMPANY_SUCCESS,
        payload: data
      })
      break
    case 'fetch':
      yield put({
        type: Type.FETCH_COMPANY_LIST_SUCCESS,
        payload: data
      })
      break
    case 'delete':
      yield put({
        type: Type.DELETE_COMPANY_SUCCESS,
        payload: data
      })
      break
    default:
      yield put({
        type: Type.REQUEST_ERROR,
        payload: '没有相应的操作。'
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
  yield put({ type: Type.REQUEST_ERROR, payload: error })
  yield put({
    type: Type.SET_LOADING,
    payload: { scope: scope, loading: false }
  })
}

const companyEffects = {
  loading: loadingEffect,
  error: errorEffect,
  screen: screenEffect
}

const machine = new Machine(companyState, companyEffects)
const fetchEffect = machine.getEffect('fetch')
const createEffect = machine.getEffect('create')
const deleteEffect = machine.getEffect('delete')
const successEffect = machine.getEffect('success')
const failureEffect = machine.getEffect('failure')

function * createCompanyFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      Type.CREATE_COMPANY_REQUEST
    )
    yield createEffect('create')
    try {
      const company = yield call(Api.createCompany, action.payload)
      if (company) {
        yield successEffect('create', company)
      }
    } catch (error) {
      yield failureEffect('create', error)
    }
  }
}

function * fetchAllCompaniesFlow() {
  while (true) {
    yield take(Type.FETCH_COMPANY_LIST_REQUEST)
    yield fetchEffect('fetch')
    try {
      const company = yield call(Api.getAllCompanies)
      if (company) {
        yield successEffect('fetch', company)
      }
    } catch (error) {
      yield failureEffect('fetch', error)
    }
  }
}

function * deleteCompanyByIdFlow() {
  while (true) {
    const action: { type: string, payload: string } = yield take(
      Type.DELETE_COMPANY_REQUEST
    )
    const { payload } = action
    yield deleteEffect('delete')
    try {
      const company = yield call(Api.deleteCompanyById, payload)
      if (company) {
        yield successEffect('delete', payload)
      }
    } catch (error) {
      yield failureEffect('delete', error)
    }
  }
}

export default function * rootSagas(): any {
  yield fork(createCompanyFlow)
  yield fork(fetchAllCompaniesFlow)
  yield fork(deleteCompanyByIdFlow)
}
