import Immutable, { fromJS, is } from 'immutable'
import { normalize, denormalize, schema } from 'normalizr'
import createImmutableSelector from './src/client/modules/shared/createImmutableSelector'

const driver = {
  id: 12,
  name: 35
}
const driver1 = {
  id: 13,
  name: 35
}

const userSchema = new schema.Entity('users')

const users = fromJS(normalize([driver, driver1], [userSchema]))

const userEntity = users.get('entities')
const userResult = users.get('result')

console.log(userEntity)
console.log(userResult)

const deUser = (id, entities) => denormalize(id, userSchema, entities)
const deArrayUser = (id, entities) => denormalize(id, [userSchema], entities)

const userArraySelector = createImmutableSelector([deArrayUser], users => users)

const users1 = userArraySelector(userResult, userEntity)
const users2 = userArraySelector(userResult, userEntity)

console.log(is(users1, users2))

console.log(is(driver, driver1))
