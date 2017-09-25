import { schema, normalize, denormalize } from 'normalizr'

export const userSchema = new schema.Entity('users', {}, { idAttribute: 'username' })

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
    principal: userSchema,
    secondary: userSchema,
    fuels: [fuelSchema],
    maintenance: [maintainSchema]
  },
  { idAttribute: '_id' }
)

const vehicleNormalize = data => normalize(data, vehicleSchema)
const vehicleArrayNormalize = data => normalize(data, [vehicleSchema])

const denormalizeVehicle = (entities, id) =>
  denormalize(id, vehicleSchema, entities)
const denormalizeVehicleArray = (entities, id) =>
  denormalize(id, [vehicleSchema], entities)

export {
  vehicleNormalize,
  vehicleArrayNormalize,
  denormalizeVehicle,
  denormalizeVehicleArray
}
