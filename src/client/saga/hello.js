// @flow

import 'isomorphic-fetch'
import { call, put, takeEvery } from 'redux-saga/effects'
import { helloEndpointRoute } from '../../shared/routes'
import {
  SAY_HELLO_ASYNC_REQUEST, sayHelloAsyncSuccess, sayHelloAsyncFailure
} from '../action/hello'

// function fetchHello (num: number) {
//   return fetch(helloEndpointRoute(num), { method: 'GET' })
//     .then((res) => { return res.json() })
//     .then((data) => {
//       console.log(data)
//       return {data}
//     })
//     .catch((error) => {
//       console.log(error)
//       return {error}
//     })
// }

const fetchHello = async function (num: number) {
  try {
    let response = await fetch(helloEndpointRoute(num), { method: 'GET' })
    let data = await response.json()
    return {data: data}
  } catch (error) {
    return {error: error}
  }
}

function * handleRequestHello (action: { type: string, payload: any }) {
  const { data, error } = yield call(fetchHello, action.payload)
  if (data && !error) {
    yield put(sayHelloAsyncSuccess(data.serverMessage))
  } else {
    yield put(sayHelloAsyncFailure(error))
  }
}

// flow-disable-next-line
export default function * watchRequestHello () {
  yield takeEvery(SAY_HELLO_ASYNC_REQUEST, handleRequestHello)
}
