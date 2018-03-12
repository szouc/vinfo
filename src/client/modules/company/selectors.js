// @flow

import { denormalizeCompany, denormalizeCompanyArray } from './schema'
import createImmutableSelector from '@clientUtils/createImmutableSelector'

const companySelector = createImmutableSelector([denormalizeCompany], company => company)

const companyArraySelector = createImmutableSelector(
  [denormalizeCompanyArray],
  companies => companies
)

export { companySelector, companyArraySelector }
