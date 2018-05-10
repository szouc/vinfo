// @flow

import createImmutableSelector from '@clientUtils/createImmutableSelector'

const companyCurrent = state => state.getIn(['company', 'status', 'current'])
const companyIds = state => state.getIn(['company', 'status', 'all'])
const companyEntities = state => state.getIn(['entities', 'companies'])
const selectIds = state => state.getIn(['company', 'status', 'selectIds'])

const companyArraySelector = createImmutableSelector(
  [companyEntities, companyIds],
  (company, ids) => {
    return ids.map(item => company.get(item))
  }
)

const companySelector = createImmutableSelector(
  [companyEntities, companyCurrent],
  (company, current) => company.get(current)
)

const companySelectSelector = createImmutableSelector(
  [companyEntities, selectIds],
  (company, ids) => {
    return ids.map(item => company.get(item))
  }
)
export { companySelector, companyArraySelector, companySelectSelector }
