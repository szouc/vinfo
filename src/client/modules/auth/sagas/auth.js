// @flow

import 'isomorphic-fetch'

import {
  USER_LOGIN_REQUEST,
  userLoginFailure,
  userLoginSuccess
} from '../actions/auth'

import * as Api from '../api/auth'

import { call, put, takeEvery } from 'redux-saga/effects'

function * handleRequestLogin (action: { type: string, payload: any }) {
  const { data, error } = yield call(Api.login, action.payload)
  if (data && !error) {
    yield put(userLoginSuccess('success'))
  } else {
    yield put(userLoginFailure(error))
  }
}

// flow-disable-next-line
export default function * watchRequestLogin () {
  yield takeEvery(USER_LOGIN_REQUEST, handleRequestLogin)
}
