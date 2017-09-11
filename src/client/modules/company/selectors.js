// @flow

import { denormalizeCompany, denormalizeCompanyArray } from './schema'
import createImmutableSelector from '@clientModulesShared/createImmutableSelector'

const companySelector = createImmutableSelector([denormalizeCompany], company => company)

const companyArraySelector = createImmutableSelector(
  [denormalizeCompanyArray],
  companies => companies
)

export { companySelector, companyArraySelector }
