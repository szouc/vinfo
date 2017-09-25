// @flow

import { denormalizeUser, denormalizeUserArray } from './schema'
import createImmutableSelector from '@clientModulesShared/createImmutableSelector'

const userEntity = state => state.getIn(['user', 'userEntity'])
const userCurrent = state => state.getIn(['user', 'userStatus', 'current'])
const userAll = state => state.getIn(['user', 'userStatus', 'all'])

const userSelector = createImmutableSelector(
  [userEntity, userCurrent],
  (users, id) => denormalizeUser(users, id)
)

const userArraySelector = createImmutableSelector(
  [userEntity, userAll],
  (users, all) => denormalizeUserArray(users, all)
)

const driverArraySelector = createImmutableSelector(
  [userArraySelector],
  users => users.filter((user, i) => user.get('role') === 'driver')
)

export { userSelector, userArraySelector, driverArraySelector }
