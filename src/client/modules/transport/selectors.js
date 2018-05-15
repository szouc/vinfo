import createImmutableSelector from '@clientUtils/createImmutableSelector'

const allEntities = state => state.get('entities')
// const transportEntity = state => state.getIn(['entities', 'transports'])
const transportCurrent = state =>
  state.getIn(['transport', 'status', 'current'])
const transportIds = state => state.getIn(['transport', 'status', 'all'])

const transportSelector = createImmutableSelector(
  [allEntities, transportCurrent],
  (entities, current) => entities.get(current)
)

const transportArraySelector = createImmutableSelector(
  [allEntities, transportIds],
  (entities, ids) => ids.map(item => entities.get(item))
)

export { transportSelector, transportArraySelector }
