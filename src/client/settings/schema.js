import { schema, normalize } from 'normalizr'

export const userSchema = new schema.Entity(
  'users',
  {},
  { idAttribute: 'username' }
)

export const fuelSchema = new schema.Entity(
  'fuels',
  {
    applicant: userSchema
  },
  { idAttribute: '_id' }
)

export const maintainSchema = new schema.Entity(
  'maintenance',
  {
    applicant: userSchema
  },
  { idAttribute: '_id' }
)

export const vehicleSchema = new schema.Entity(
  'vehicles',
  {
    captain: userSchema,
    principal: userSchema,
    secondary: userSchema,
    fuels: [fuelSchema],
    maintenance: [maintainSchema]
  },
  { idAttribute: '_id' }
)

export const companySchema = new schema.Entity(
  'companies',
  {},
  { idAttribute: '_id' }
)

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
    product: productSchema,
    accountant: userSchema
  },
  { idAttribute: '_id' }
)

const userNormalize = data => normalize(data, userSchema)
const userArrayNormalize = data => normalize(data, [userSchema])
const companyNormalize = data => normalize(data, companySchema)
const companyArrayNormalize = data => normalize(data, [companySchema])
const productNormalize = data => normalize(data, productSchema)
const productArrayNormalize = data => normalize(data, [productSchema])
const vehicleNormalize = data => normalize(data, vehicleSchema)
const vehicleArrayNormalize = data => normalize(data, [vehicleSchema])
const transportNormalize = data => normalize(data, transportSchema)
const transportArrayNormalize = data => normalize(data, [transportSchema])

export {
  userNormalize,
  userArrayNormalize,
  companyNormalize,
  companyArrayNormalize,
  productNormalize,
  productArrayNormalize,
  vehicleNormalize,
  vehicleArrayNormalize,
  transportNormalize,
  transportArrayNormalize
}
