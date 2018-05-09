// @flow

import createImmutableSelector from '@clientUtils/createImmutableSelector'

const userEntity = state => state.getIn(['entities', 'users'])
const userCurrent = state => state.getIn(['user', 'status', 'current'])
const userIds = state => state.getIn(['user', 'status', 'all'])
const driverIds = state => state.getIn(['user', 'status', 'driverIds'])
const captainIds = state => state.getIn(['user', 'status', 'captainIds'])

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

export {
  userSelector,
  userArraySelector,
  driverArraySelector,
  captainArraySelector
}
