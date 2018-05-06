// @flow

import createImmutableSelector from '@clientUtils/createImmutableSelector'

const userEntity = state => state.getIn(['entities', 'users'])
const userCurrent = state => state.getIn(['user', 'status', 'current'])
const userIds = state => state.getIn(['user', 'status', 'all'])

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
  [userArraySelector],
  users => users.filter((user, i) => user.get('role') === 'driver')
)

const captainArraySelector = createImmutableSelector(
  [userArraySelector],
  users => users.filter((user, i) => user.get('role') === 'captain')
)

export {
  userSelector,
  userArraySelector,
  driverArraySelector,
  captainArraySelector
}
