import { schema, normalize, denormalize } from 'normalizr'

export const userSchema = new schema.Entity(
  'users',
  {},
  { idAttribute: 'username' }
)

export const vehicleSchema = new schema.Entity(
  'vehicles',
  {},
  { idAttribute: '_id' }
)

export const companySchema = new schema.Entity(
  'companies',
  {},
  { idAttribute: '_id' }
)

export const productSchema = new schema.Entity(
  'products',
  {},
  { idAttribute: '_id' }
)

export const transportSchema = new schema.Entity(
  'transports',
  {
    assigner: userSchema,
    vehicle: vehicleSchema,
    principal: userSchema,
    secondary: userSchema,
    from: {
      company: companySchema
    },
    to: {
      company: companySchema
    },
    product: productSchema
  },
  { idAttribute: '_id' }
)

const transportNormalize = data => normalize(data, transportSchema)
const transportArrayNormalize = data => normalize(data, [transportSchema])

const denormalizeTransport = (entities, id) =>
  denormalize(id, transportSchema, entities)
const denormalizeTransportArray = (entities, id) =>
  denormalize(id, [transportSchema], entities)

export {
  transportNormalize,
  transportArrayNormalize,
  denormalizeTransport,
  denormalizeTransportArray
}
