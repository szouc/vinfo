import { schema } from 'normalizr'

export const companySchema = new schema.Entity(
  'companies',
  {},
  { idAttribute: '_id' }
)
