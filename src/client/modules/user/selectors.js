// @flow

import { denormalizeUser, denormalizeUserArray } from './schema'
import createImmutableSelector from '@clientModulesShared/createImmutableSelector'

const userSelector = createImmutableSelector(
  [denormalizeUser],
  users => users
)

const userArraySelector = createImmutableSelector(
  [denormalizeUserArray],
  users => users
)

export { userSelector, userArraySelector }
