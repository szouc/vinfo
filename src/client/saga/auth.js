// @flow

import 'isomorphic-fetch'

import {
  USER_LOGIN_REQUEST,
  userLoginFailure,
  userLoginSuccess
} from '../action/auth'
import { call, put, takeEvery } from 'redux-saga/effects'

const fetchLogin = async function () {
  try {
    let response = await fetch('/auth/login', { method: 'POST' })
    let data = await response.json()
    return {data: data}
  } catch (error) {
    return {error: error}
  }
}

function * handleRequestLogin (action: { type: string, payload: any }) {
  const { data, error } = yield call(fetchLogin, action.payload)
  if (data && !error) {
    yield put(userLoginSuccess(data.serverMessage))
  } else {
    yield put(userLoginFailure(error))
  }
}

// flow-disable-next-line
export default function * watchRequestLogin () {
  yield takeEvery(USER_LOGIN_REQUEST, handleRequestLogin)
}
