import { schema, normalize, denormalize } from 'normalizr'

export const priceHistorySchema = new schema.Entity(
  'price_histories',
  {},
  { idAttribute: '_id' }
)

export const productSchema = new schema.Entity(
  'products',
  {
    price_history: [priceHistorySchema]
  },
  { idAttribute: '_id' }
)

const productNormalize = data => normalize(data, productSchema)
const productArrayNormalize = data => normalize(data, [productSchema])

const denormalizeProduct = (entities, id) =>
  denormalize(id, productSchema, entities)
const denormalizeProductArray = (entities, id) =>
  denormalize(id, [productSchema], entities)

export {
  productNormalize,
  productArrayNormalize,
  denormalizeProduct,
  denormalizeProductArray
}
