// @flow

import * as Type from './actionTypes'
import { REQUEST_ERROR } from '../error/actionTypes'
import Machine from '@clientUtils/machine'
import { ADD_PRODUCT_ENTITY, DELETE_ENTITY } from '../entity/actionTypes'
import { PRODUCT_STATE_KEY } from '@clientSettings/schema'
import { Message } from 'antd'
import { reset } from 'redux-form/immutable'

import { call, put, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
// Use for redux-form/immutable
// import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'

import * as Api from './api'

const productState = {
  currentState: 'screen',
  states: {
    screen: {
      fetch: 'loading',
      fetchAll: 'loading',
      create: 'loading',
      delete: 'loading',
      createPH: 'loading',
      deletePH: 'loading',
      update: 'loading'
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
        type: ADD_PRODUCT_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.CREATE_SUCCESS,
        payload: data.get('result')
      })
      Message.success('产品创建成功。', 2)
      yield put(reset('productCreateForm'))
      break
    case 'fetch':
      yield put({
        type: ADD_PRODUCT_ENTITY,
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
        type: ADD_PRODUCT_ENTITY,
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
        payload: { stateKey: PRODUCT_STATE_KEY, id: data.get('id') }
      })
      Message.success('产品删除成功。', 2)
      break
    case 'update':
      yield put({
        type: ADD_PRODUCT_ENTITY,
        payload: data.get('entities')
      })
      yield put({
        type: Type.UPDATE_SUCCESS,
        payload: data.get('result')
      })
      Message.success('产品更新成功。', 2)
      break
    case 'createPH':
      yield put({
        type: ADD_PRODUCT_ENTITY,
        payload: data.get('entities')
      })
      Message.success('历史价格创建成功。', 2)
      break
    case 'deletePH':
      yield put({
        type: ADD_PRODUCT_ENTITY,
        payload: data.get('entities')
      })
      Message.success('历史价格删除成功。', 2)
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
    payload: fromJS({ errorScope: 'Product', message: error.message })
  })
  yield put({
    type: Type.SET_LOADING,
    payload: { scope: scope, loading: false }
  })
}

const productEffects = {
  loading: loadingEffect,
  error: errorEffect,
  screen: screenEffect
}

const machine = new Machine(productState, productEffects)
const fetchEffect = machine.getEffect('fetch')
const fetchAllEffect = machine.getEffect('fetchAll')
const createEffect = machine.getEffect('create')
const deleteEffect = machine.getEffect('delete')
const updateEffect = machine.getEffect('update')
const createPHEffect = machine.getEffect('createPH')
const deletePHEffect = machine.getEffect('deletePH')
const successEffect = machine.getEffect('success')
const failureEffect = machine.getEffect('failure')

function * createProductFlow(action) {
  yield createEffect('form')
  yield call(delay, 100)
  try {
    const product = yield call(Api.createProduct, action.payload)
    if (product) {
      yield successEffect('form', 'create', product)
    }
  } catch (error) {
    yield failureEffect('form', error)
    machine.operation('retry')
  }
}

function * fetchAllProductsFlow() {
  yield fetchAllEffect('list')
  try {
    const product = yield call(Api.getAllProducts)
    if (product) {
      yield successEffect('list', 'fetchAll', product)
    }
  } catch (error) {
    yield failureEffect('list', error)
    machine.operation('retry')
  }
}

function * fetchProductsFlow(action) {
  yield fetchEffect('list')
  try {
    const result = yield call(Api.getProductsWithPg, action.payload)
    if (result) {
      const product = result.get('product')
      const pagination = result.get('pagination')
      yield successEffect('list', 'fetch', product, pagination)
    }
  } catch (error) {
    yield failureEffect('list', error)
    machine.operation('retry')
  }
}

function * deleteProductByIdFlow(action) {
  yield deleteEffect('list')
  yield call(delay, 100)
  try {
    const productId = yield call(Api.deleteProductById, action.payload)
    if (productId) {
      yield successEffect('list', 'delete', productId)
    }
  } catch (error) {
    yield failureEffect('list', error)
    machine.operation('retry')
  }
}

function * createPriceHistoryFlow(action) {
  yield createPHEffect('formPH')
  yield call(delay, 100)
  try {
    const product = yield call(Api.createPriceHistory, action.payload)
    if (product) {
      yield successEffect('formPH', 'createPH', product)
    }
  } catch (error) {
    yield failureEffect('formPH', error)
    machine.operation('retry')
  }
}

function * deletePriceHistoryByIdFlow(action) {
  yield deletePHEffect('listPH')
  yield call(delay, 100)
  try {
    const productId = yield call(Api.deletePriceHistoryById, action.payload)
    if (productId) {
      yield successEffect('listPH', 'deletePH', productId)
    }
  } catch (error) {
    yield failureEffect('listPH', error)
    machine.operation('retry')
  }
}

function * updateProductByIdFlow(action) {
  yield updateEffect('formUpdate')
  yield call(delay, 100)
  try {
    const product = yield call(Api.updateProductById, action.payload)
    if (product) {
      yield successEffect('formUpdate', 'update', product)
    }
  } catch (error) {
    yield failureEffect('formUpdate', error)
    machine.operation('retry')
  }
}

/**
 * productSelect Saga
 * this saga doesn't include in product main screen logic.
 * @param {any} action redux action
 */
function * fetchProductSelectFlow(action) {
  yield put({
    type: Type.SET_LOADING,
    payload: { scope: 'select', loading: true }
  })
  try {
    const result = yield call(Api.getProductsWithPg, action.payload)
    if (result) {
      const product = result.get('product')
      const pagination = result.get('pagination')
      yield put({
        type: ADD_PRODUCT_ENTITY,
        payload: product.get('entities')
      })
      yield put({
        type: Type.FETCH_SELECT_SUCCESS,
        payload: product.get('result')
      })
      yield put({
        type: Type.SET_PAGINATION,
        payload: pagination
      })
      yield put({
        type: Type.SET_LOADING,
        payload: { scope: 'select', loading: false }
      })
    }
  } catch (error) {
    yield put({
      type: REQUEST_ERROR,
      payload: fromJS({ errorScope: 'ProductSelect', message: error.message })
    })
    yield put({
      type: Type.SET_LOADING,
      payload: { scope: 'select', loading: false }
    })
  }
}

export default function * rootSagas(): any {
  yield takeLatest(Type.CREATE_REQUEST, createProductFlow)
  yield takeLatest(Type.FETCH_ALL_REQUEST, fetchAllProductsFlow)
  yield takeLatest(Type.FETCH_LIST_REQUEST, fetchProductsFlow)
  yield takeLatest(Type.DELETE_REQUEST, deleteProductByIdFlow)
  yield takeLatest(Type.CREATE_PRICE_HISTORY_REQUEST, createPriceHistoryFlow)
  yield takeLatest(
    Type.DELETE_PRICE_HISTORY_REQUEST,
    deletePriceHistoryByIdFlow
  )
  yield takeLatest(Type.UPDATE_REQUEST, updateProductByIdFlow)
  yield takeLatest(Type.FETCH_SELECT_REQUEST, fetchProductSelectFlow)
}
