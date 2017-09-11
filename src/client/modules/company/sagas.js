// @flow

import {
  SET_LOADING,
  REQUEST_ERROR,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  FETCH_COMPANY_LIST_REQUEST,
  FETCH_COMPANY_LIST_SUCCESS
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

function * createCompanyFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      CREATE_COMPANY_REQUEST
    )
    yield put({
      type: SET_LOADING,
      payload: { scope: 'create', loading: true }
    })
    try {
      const company = yield call(Api.createCompany, action.payload)
      if (company) {
        yield put({ type: CREATE_COMPANY_SUCCESS, payload: company })
      }
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
    } finally {
      yield fork(clearLoadingAndError, 'create')
    }
  }
}

function * fetchAllCompaniesFlow() {
  while (true) {
    yield take(FETCH_COMPANY_LIST_REQUEST)
    yield put({
      type: SET_LOADING,
      payload: { scope: 'fetchList', loading: true }
    })
    try {
      const company = yield call(Api.getAllCompanies)
      if (company) {
        yield put({ type: FETCH_COMPANY_LIST_SUCCESS, payload: company })
      }
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
    } finally {
      yield fork(clearLoadingAndError, 'fetchList')
    }
  }
}

function * deleteCompanyByIdFlow() {
  while (true) {
    const action: { type: string, payload: string } = yield take(
      DELETE_COMPANY_REQUEST
    )
    const { payload } = action
    yield put({
      type: SET_LOADING,
      payload: { scope: 'delete', loading: true }
    })
    try {
      const company = yield call(Api.deleteCompanyById, payload)
      if (company) {
        yield put({
          type: DELETE_COMPANY_SUCCESS,
          payload: company.get('result')
        })
      }
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
    } finally {
      yield fork(clearLoadingAndError, 'delete')
    }
  }
}

export default function * rootSagas(): any {
  yield fork(createCompanyFlow)
  yield fork(fetchAllCompaniesFlow)
  yield fork(deleteCompanyByIdFlow)
}
