import { saga as authSagas } from '../modules/auth'
import { saga as companySagas } from '../modules/company'
import { fork } from 'redux-saga/effects'

export default function * rootSagas() {
  yield fork(authSagas)
  yield fork(companySagas)
}
