// @flow

import * as Type from './actionTypes'
import { REQUEST_ERROR, CLEAR_ERROR } from '../error/actionTypes'
import { SET_PAGINATION } from '@clientModulesShared/paginationReducer/actionTypes'

import Machine from '@clientUtils/machine'
import { call, put, take, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'

import * as Api from './api'

const companyState = {
  currentState: 'screen',
  states: {
    screen: {
      fetch: 'loading',
      fetchAll: 'loading',
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
      yield put({
        type: `COMPANY_${SET_PAGINATION}`,
        payload: pagination
      })
      break
    case 'fetchAll':
      yield put({
        type: Type.FETCH_COMPANY_ALL_SUCCESS,
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
  yield delay(3000)
  yield put({ type: CLEAR_ERROR })
}

const companyEffects = {
  loading: loadingEffect,
  error: errorEffect,
  screen: screenEffect
}

const machine = new Machine(companyState, companyEffects)
const fetchEffect = machine.getEffect('fetch')
const fetchAllEffect = machine.getEffect('fetchAll')
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
      machine.operation('retry')
    }
  }
}

function * fetchAllCompaniesFlow() {
  while (true) {
    yield take(Type.FETCH_COMPANY_ALL_REQUEST)
    yield fetchAllEffect('fetchAll')
    try {
      const company = yield call(Api.getAllCompanies)
      if (company) {
        yield successEffect('fetchAll', company)
      }
    } catch (error) {
      yield failureEffect('fetchAll', error)
      machine.operation('retry')
    }
  }
}

function * fetchCompaniesFlow() {
  while (true) {
    const action: { type: String, payload?: Immut } = yield take(
      Type.FETCH_COMPANY_LIST_REQUEST
    )
    yield fetchEffect('fetch')
    try {
      const result = yield call(Api.getCompaniesWithPg, action.payload)
      if (result) {
        const company = result.get('company')
        const pagination = result.get('pagination')
        yield successEffect('fetch', company, pagination)
      }
    } catch (error) {
      yield failureEffect('fetch', error)
      machine.operation('retry')
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
        console.log(company)
        yield successEffect('delete', payload)
      }
    } catch (error) {
      yield failureEffect('delete', error)
      machine.operation('retry')
    }
  }
}

export default function * rootSagas(): any {
  yield fork(createCompanyFlow)
  yield fork(fetchAllCompaniesFlow)
  yield fork(fetchCompaniesFlow)
  yield fork(deleteCompanyByIdFlow)
}
