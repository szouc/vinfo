// @flow

import * as Api from './api'
import * as Type from './actionTypes'

import { ADD_COMPANY_ENTITY, DELETE_ENTITY } from '../entity/actionTypes'
import { call, put, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { reset } from 'redux-form/immutable'
import { Message } from 'antd'

import { COMPANY_STATE_KEY } from '@clientSettings/schema'
// Use for redux-form/immutable
// import type { fromJS as Immut } from 'immutable'
import Machine from '@clientUtils/machine'
import { REQUEST_ERROR } from '../error/actionTypes'
import { fromJS } from 'immutable'

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

/**
 * The effects which will be execute when status transforms to the 'screen' status.
 *
 * @param {String} scope - the loading scope
 * @param {String} action - the action of the page
 * @param {Object} data - the result of the action
 * @param {Object} [pagination={}]
 */
function * screenEffect(scope, action, data, pagination = {}) {
  switch (action) {
    case 'create':
      yield put({
        type: ADD_COMPANY_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.CREATE_SUCCESS,
        payload: data.get('result')
      })
      Message.success('公司创建成功。', 2)
      yield put(reset('companyCreateForm'))
      break
    case 'fetch':
      yield put({
        type: ADD_COMPANY_ENTITY,
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
        type: ADD_COMPANY_ENTITY,
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
        payload: { stateKey: COMPANY_STATE_KEY, id: data.get('id') }
      })
      Message.success('公司删除成功。', 2)
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
    payload: fromJS({ errorScope: 'Company', message: error.message })
  })
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
const fetchAllEffect = machine.getEffect('fetchAll')
const createEffect = machine.getEffect('create')
const deleteEffect = machine.getEffect('delete')
const successEffect = machine.getEffect('success')
const failureEffect = machine.getEffect('failure')

function * createCompanyFlow(action) {
  yield createEffect('form')
  yield call(delay, 100)
  try {
    const company = yield call(Api.createCompany, action.payload)
    if (company) {
      yield successEffect('form', 'create', company)
    }
  } catch (error) {
    yield failureEffect('form', error)
    machine.operation('retry')
  }
}

function * fetchAllCompaniesFlow() {
  yield fetchAllEffect('list')
  yield call(delay, 100)
  try {
    const company = yield call(Api.getAllCompanies)
    if (company) {
      yield successEffect('list', 'fetchAll', company)
    }
  } catch (error) {
    yield failureEffect('list', error)
    machine.operation('retry')
  }
}

function * fetchCompaniesFlow(action) {
  yield fetchEffect('list')
  yield call(delay, 100)
  try {
    const result = yield call(Api.getCompaniesWithPg, action.payload)
    if (result) {
      const company = result.get('company')
      const pagination = result.get('pagination')
      yield successEffect('list', 'fetch', company, pagination)
    }
  } catch (error) {
    yield failureEffect('list', error)
    machine.operation('retry')
  }
}

function * deleteCompanyByIdFlow(action) {
  const { payload } = action
  yield deleteEffect('list')
  yield call(delay, 100)
  try {
    const companyId = yield call(Api.deleteCompanyById, payload)
    if (companyId) {
      yield successEffect('list', 'delete', companyId)
    }
  } catch (error) {
    yield failureEffect('list', error)
    machine.operation('retry')
  }
}

export default function * rootSagas(): any {
  // yield fork(createCompanyFlow)
  // yield fork(fetchAllCompaniesFlow)
  // yield fork(fetchCompaniesFlow)
  // yield fork(deleteCompanyByIdFlow)
  yield takeLatest(Type.CREATE_REQUEST, createCompanyFlow)
  yield takeLatest(Type.FETCH_ALL_REQUEST, fetchAllCompaniesFlow)
  yield takeLatest(Type.FETCH_LIST_REQUEST, fetchCompaniesFlow)
  yield takeLatest(Type.DELETE_REQUEST, deleteCompanyByIdFlow)
}
