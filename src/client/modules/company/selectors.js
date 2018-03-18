// @flow

import createImmutableSelector from '@clientUtils/createImmutableSelector'

const companyCurrent = state => state.getIn(['company', 'status', 'current'])
const companyIds = state => state.getIn(['company', 'status', 'all'])
const companyEntities = state => state.getIn(['entities', 'companies'])

const companyArraySelector = createImmutableSelector(
  [companyEntities, companyIds],
  (company, ids) => {
    return ids ? ids.map(item => company.get(item)) : []
  }
)

const companySelector = createImmutableSelector(
  [companyEntities, companyCurrent],
  (company, current) => company.get(current)
)

export { companySelector, companyArraySelector }
