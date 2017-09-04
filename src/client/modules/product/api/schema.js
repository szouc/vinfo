import { schema } from 'normalizr'

export const priceHistorySchema = new schema.Entity(
  'price_histories',
  {},
  { idAttribute: '_id' }
)

export const productSchema = new schema.Entity(
  'products',
  {
    price_history: priceHistorySchema
  },
  { idAttribute: '_id' }
)
