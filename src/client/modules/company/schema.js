// @flow

import type { fromJS as Immut } from 'immutable'
import { schema, normalize, denormalize } from 'normalizr'

const companySchema = new schema.Entity('companies', {}, { idAttribute: '_id' })

const companyNormalize = (data: any) => normalize(data, companySchema)
const companyArrayNormalize = (data: any) => normalize(data, [companySchema])

const denormalizeCompany = (entities: Immut, id: string): Immut =>
  denormalize(id, companySchema, entities)
const denormalizeCompanyArray = (entities: Immut, ids: Immut): Immut =>
  denormalize(ids, [companySchema], entities)

export {
  companyNormalize,
  companyArrayNormalize,
  denormalizeCompany,
  denormalizeCompanyArray
}
