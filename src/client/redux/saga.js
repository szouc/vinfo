import { fork } from 'redux-saga/effects'

import { saga as authSagas } from '../modules/auth'
import { saga as companySagas } from '../modules/company'
import { saga as productSagas } from '../modules/product'

export default function * rootSagas() {
  yield fork(authSagas)
  yield fork(companySagas)
  yield fork(productSagas)
}
