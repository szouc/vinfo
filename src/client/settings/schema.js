import { schema, normalize, denormalize } from 'normalizr'

export const COMPANY_STATE_KEY = 'companies'
export const USER_STATE_KEY = 'users'
export const PRODUCT_STATE_KEY = 'products'
export const FUEL_STATE_KEY = 'fuels'
export const MAINTAIN_STATE_KEY = 'maintenance'
export const PRICE_HISTORY_STATE_KEY = 'price_histories'
export const VEHICLE_STATE_KEY = 'vehicles'
export const TRANSPORT_STATE_KEY = 'transports'

export const userSchema = new schema.Entity(
  USER_STATE_KEY,
  {},
  { idAttribute: 'username' }
)

export const fuelSchema = new schema.Entity(
  FUEL_STATE_KEY,
  {
    applicant: userSchema
  },
  { idAttribute: '_id' }
)

export const maintainSchema = new schema.Entity(
  MAINTAIN_STATE_KEY,
  {
    applicant: userSchema
  },
  { idAttribute: '_id' }
)

export const vehicleSchema = new schema.Entity(
  VEHICLE_STATE_KEY,
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
  COMPANY_STATE_KEY,
  {},
  { idAttribute: '_id' }
)

export const priceHistorySchema = new schema.Entity(
  PRICE_HISTORY_STATE_KEY,
  {},
  { idAttribute: '_id' }
)

export const productSchema = new schema.Entity(
  PRODUCT_STATE_KEY,
  {
    priceHistory: [priceHistorySchema]
  },
  { idAttribute: '_id' }
)

export const transportSchema = new schema.Entity(
  TRANSPORT_STATE_KEY,
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
const userDenormalize = (id, entities) => denormalize(id, userSchema, entities)
const userArrayNormalize = data => normalize(data, [userSchema])
const userArrayDenormalize = (ids, entities) =>
  denormalize(ids, [userSchema], entities)

const companyNormalize = data => normalize(data, companySchema)
const companyDenormalize = (id, entities) =>
  denormalize(id, companySchema, entities)
const companyArrayNormalize = data => normalize(data, [companySchema])
const companyArrayDenormalize = (ids, entities) =>
  denormalize(ids, [companySchema], entities)

const productNormalize = data => normalize(data, productSchema)
const productDenormalize = (id, entities) =>
  denormalize(id, productSchema, entities)
const productArrayNormalize = data => normalize(data, [productSchema])
const productArrayDenormalize = (ids, entities) =>
  denormalize(ids, [productSchema], entities)

const vehicleNormalize = data => normalize(data, vehicleSchema)
const vehicleDenormalize = (id, entities) =>
  denormalize(id, vehicleSchema, entities)
const vehicleArrayNormalize = data => normalize(data, [vehicleSchema])
const vehicleArrayDenormalize = (ids, entities) =>
  denormalize(ids, [vehicleSchema], entities)

const transportNormalize = data => normalize(data, transportSchema)
const transportDenormalize = (id, entities) =>
  denormalize(id, transportSchema, entities)
const transportArrayNormalize = data => normalize(data, [transportSchema])
const transportArrayDenormalize = (ids, entities) =>
  denormalize(ids, [transportSchema], entities)

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
  transportArrayNormalize,
  userDenormalize,
  userArrayDenormalize,
  companyDenormalize,
  companyArrayDenormalize,
  productDenormalize,
  productArrayDenormalize,
  vehicleDenormalize,
  vehicleArrayDenormalize,
  transportDenormalize,
  transportArrayDenormalize
}
