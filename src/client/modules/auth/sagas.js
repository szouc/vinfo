// @flow

import {
  SET_LOADING,
  SET_AUTH,
  REQUEST_ERROR,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS
} from './actionTypes'

import { push, replace } from 'react-router-redux'
import { call, put, take, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'

import * as Api from './api'

/**
 * Log in saga
 * @export
 */
export function * loginFlow(): any {
  while (true) {
    const action: { type: string, payload: Immut } = yield take(LOGIN_REQUEST)
    const username: string = action.payload.get('username')
    const password: string = action.payload.get('password')
    // load pending page
    yield put({ type: SET_LOADING, payload: { scope: 'login', loading: true } })
    try {
      let isAuth: ?boolean = yield call(Api.login, { username, password })
      if (isAuth) {
        yield put({ type: SET_AUTH, payload: true })
        yield put({ type: FETCH_PROFILE_REQUEST, payload: username })
        yield put(push('/')) // Redirect to the root
      }
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
      yield put(replace('/login')) // Redirect to the login page
    } finally {
      // unload pending page
      yield put({
        type: SET_LOADING,
        payload: { scope: 'login', loading: false }
      })
      yield delay(2000)
      yield put({ type: REQUEST_ERROR, payload: '' })
    }
  }
}

/**
 * Fetch User Info by username saga
 *
 * @export
 * @returns {*}
 */
export function * fetchProfileFlow(): any {
  while (true) {
    const action: { type: string, payload: string } = yield take(
      FETCH_PROFILE_REQUEST
    )
    const username = action.payload
    yield put({
      type: SET_LOADING,
      payload: { scope: 'fetchProfile', loading: true }
    })
    try {
      let user = yield call(Api.fetchProfile, username)
      yield put({ type: FETCH_PROFILE_SUCCESS, payload: user })
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
      yield put(replace('/login')) // Redirect to the login page
    } finally {
      yield put({
        type: SET_LOADING,
        payload: { scope: 'fetchProfile', loading: false }
      })
      yield delay(2000)
      yield put({ type: REQUEST_ERROR, payload: '' })
    }
  }
}

/**
 * Log out saga
 *
 * @export
 */
export function * logoutFlow(): any {
  while (true) {
    yield take(LOGOUT_REQUEST)
    try {
      let isLogout: ?boolean = yield call(Api.logout)
      if (isLogout) {
        yield put({ type: SET_AUTH, payload: false })
        yield put(replace('/login')) // Redirect to the login page
      }
    } catch (error) {
      yield put({ type: REQUEST_ERROR, payload: error.message })
    } finally {
      yield delay(2000)
      yield put({ type: REQUEST_ERROR, payload: '' })
    }
  }
}

export default function * rootSagas(): any {
  yield fork(loginFlow)
  yield fork(logoutFlow)
  yield fork(fetchProfileFlow)
}
