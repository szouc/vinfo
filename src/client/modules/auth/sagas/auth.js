
// @flow

import {
  LOGIN_REQUEST,
  FETCH_PROFILE_REQUEST
} from '../constants'

import * as Api from '../api'

import { call, put, take } from 'redux-saga/effects'
// Use for redux-form/immutable
import type { fromJS as Immut } from 'immutable'

/**
 * Log in saga
 * @export
 */
export function * loginFlow (): any {
  while (true) {
    let action: {type: string, payload: Immut} = yield take(LOGIN_REQUEST.ACTION)
    const payload: {username: string, password: string} = action.payload.toJS()
    // load pending page
    yield put({type: LOGIN_REQUEST.PENDING, payload: true})
    try {
      let isAuth: ?boolean = yield call(Api.login, payload)
      if (isAuth) {
        yield put({type: LOGIN_REQUEST.SUCCESS})
        yield put({type: FETCH_PROFILE_REQUEST.ACTION, payload: payload.username})
      }
    } catch (error) {
      yield put({type: LOGIN_REQUEST.ERROR, payload: error.message})
    } finally {
      // unload pending page
      yield put({type: LOGIN_REQUEST.PENDING, payload: false})
    }
  }
}

export function * fetchProfileFlow (): any {
  while (true) {
    let action: {type: string, payload: string} = yield take(FETCH_PROFILE_REQUEST.ACTION)
    yield put({type: FETCH_PROFILE_REQUEST.PENDING, payload: true})
    try {
      let user = yield call(Api.fetchProfile, action.payload)
      yield put({type: FETCH_PROFILE_REQUEST.SUCCESS, payload: user})
    } catch (error) {
      yield put({type: FETCH_PROFILE_REQUEST.ERROR, payload: error.message})
    } finally {
      yield put({type: FETCH_PROFILE_REQUEST.PENDING, payload: false})
    }
  }
}
