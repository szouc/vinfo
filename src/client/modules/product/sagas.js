// @flow

import * as Type from './actionTypes'
import { REQUEST_ERROR } from '../error/actionTypes'
import Machine from '@clientUtils/machine'
import { ADD_PRODUCT_ENTITY, DELETE_ENTITY } from '../entity/actionTypes'
import { PRODUCT_STATE_KEY } from '@clientSettings/schema'

import { call, put, take, fork } from 'redux-saga/effects'
// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'
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
      break
    case 'createPH':
      yield put({
        type: ADD_PRODUCT_ENTITY,
        payload: data.get('entities')
      })
      // yield put({
      //   type: Type.CREATE_PRICE_HISTORY_SUCCESS,
      //   payload: data.get('result')
      // })
      break
    case 'deletePH':
      yield put({
        type: ADD_PRODUCT_ENTITY,
        payload: data.get('entities')
      })
      // yield put({
      //   type: DELETE_ENTITY,
      //   payload: {
      //     stateKey: PRICE_HISTORY_STATE_KEY,
      //     id: data.get('priceHistoryId')
      //   }
      // })
      // yield put({
      //   type: Type.DELETE_PRICE_HISTORY_SUCCESS,
      //   payload: data.get('priceHistoryId')
      // })
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

function * createProductFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      Type.CREATE_REQUEST
    )
    yield createEffect('form')
    try {
      const product = yield call(Api.createProduct, action.payload)
      if (product) {
        yield successEffect('form', 'create', product)
      }
    } catch (error) {
      yield failureEffect('from', error)
      machine.operation('retry')
    }
  }
}

function * fetchAllProductsFlow() {
  while (true) {
    yield take(Type.FETCH_ALL_REQUEST)
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
}

function * fetchProductsFlow() {
  while (true) {
    const action: { type: String, payload?: Immut } = yield take(
      Type.FETCH_LIST_REQUEST
    )
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
}

function * deleteProductByIdFlow() {
  while (true) {
    const action: { type: string, payload: string } = yield take(
      Type.DELETE_REQUEST
    )
    yield deleteEffect('list')
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
}

function * createPriceHistoryFlow() {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(
      Type.CREATE_PRICE_HISTORY_REQUEST
    )
    yield createPHEffect('formPH')
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
}

function * deletePriceHistoryByIdFlow() {
  while (true) {
    const action: { type: string, payload: any } = yield take(
      Type.DELETE_PRICE_HISTORY_REQUEST
    )
    yield deletePHEffect('listPH')
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
}

function * updateProductByIdFlow() {
  while (true) {
    const action: { type: string, payload: any } = yield take(
      Type.UPDATE_REQUEST
    )
    yield updateEffect('formUpdate')
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
}

export default function * rootSagas(): any {
  yield fork(createProductFlow)
  yield fork(fetchAllProductsFlow)
  yield fork(fetchProductsFlow)
  yield fork(createPriceHistoryFlow)
  yield fork(deleteProductByIdFlow)
  yield fork(deletePriceHistoryByIdFlow)
  yield fork(updateProductByIdFlow)
}
