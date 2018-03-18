import { fork } from 'redux-saga/effects'

import { saga as authSagas } from '../modules/auth'
import { saga as companySagas } from '../modules/company'
import { saga as productSagas } from '../modules/product'
import { saga as userSagas } from '../modules/user'
// import { saga as vehicleSagas } from '../modules/vehicle'
// import { saga as transportSagas } from '../modules/transport'

export default function * rootSagas() {
  yield fork(authSagas)
  yield fork(companySagas)
  yield fork(productSagas)
  yield fork(userSagas)
  // yield fork(vehicleSagas)
  // yield fork(transportSagas)
}
