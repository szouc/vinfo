import createImmutableSelector from '@clientUtils/createImmutableSelector'
import {
  transportDenormalize,
  transportArrayDenormalize
} from '@clientSettings/schema'
import { fromJS } from 'immutable'

const allEntities = state => state.get('entities')
// const transportEntity = state => state.getIn(['entities', 'transports'])
const transportCurrent = state =>
  state.getIn(['transport', 'status', 'current'])
const transportIds = state => state.getIn(['transport', 'status', 'all'])

const transportSelector = createImmutableSelector(
  [allEntities, transportCurrent],
  (entities, current) => {
    return current ? transportDenormalize(current, entities) : fromJS({})
  }
)

const transportArraySelector = createImmutableSelector(
  [allEntities, transportIds],
  (entities, ids) => {
    return ids ? transportArrayDenormalize(ids, entities) : fromJS([])
  }
)

export { transportSelector, transportArraySelector }
