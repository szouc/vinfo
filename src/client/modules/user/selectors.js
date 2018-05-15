// @flow

import createImmutableSelector from '@clientUtils/createImmutableSelector'
import { fromJS } from 'immutable'
import moment from 'moment'

const userEntity = state => state.getIn(['entities', 'users'])
const userCurrent = state => state.getIn(['user', 'status', 'current'])
const userIds = state => state.getIn(['user', 'status', 'all'])
const driverIds = state => state.getIn(['user', 'status', 'driverIds'])
const captainIds = state => state.getIn(['user', 'status', 'captainIds'])
const userInitialValues = ownProps => fromJS(ownProps.user)

const userSelector = createImmutableSelector(
  [userEntity, userCurrent],
  (user, current) => user.get(current)
)

const userArraySelector = createImmutableSelector(
  [userEntity, userIds],
  (user, ids) => {
    return ids.map(item => user.get(item))
  }
)

const driverArraySelector = createImmutableSelector(
  [userEntity, driverIds],
  (user, ids) => {
    return ids.map(item => user.get(item))
  }
)

const captainArraySelector = createImmutableSelector(
  [userEntity, captainIds],
  (user, ids) => {
    return ids.map(item => user.get(item))
  }
)

const makeUserInitialValuesSelector = () =>
  createImmutableSelector([userInitialValues], user => {
    return user.updateIn(['detail', 'certExpired'], date => date && moment(date))
  })

export {
  userSelector,
  userArraySelector,
  driverArraySelector,
  captainArraySelector,
  makeUserInitialValuesSelector
}
