// import { schema, normalize, denormalize } from 'normalizr'

// export const userSchema = new schema.Entity(
//   'user',
//   {},
//   { idAttribute: '_id' }
// )

// export const driverSchema = new schema.Entity(
//   'drivers',
//   {
//     principal: userSchema,
//     secondary: userSchema
//   },
//   { idAttribute: '_id' }
// )

// export const fuelSchema = new schema.Entity(
//   'fuels',
//   {
//     applicant: userSchema
//   },
//   { idAttribute: '_id' }
// )

// export const maintainSchema = new schema.Entity(
//   'maintenance',
//   {
//     applicant: userSchema
//   },
//   { idAttribute: '_id' }
// )

// export const vehicleSchema = new schema.Entity(
//   'vehicles',
//   {
//     drivers: driverSchema,
//     fuels: fuelSchema,
//     maintenance: maintainSchema
//   },
//   { idAttribute: '_id' }
// )

// const productNormalize = data => normalize(data, productSchema)
// const productArrayNormalize = data => normalize(data, [productSchema])

// const denormalizeProduct = (entities, id) =>
//   denormalize(id, productSchema, entities)
// const denormalizeProductArray = (entities, id) =>
//   denormalize(id, [productSchema], entities)

// export {
//   productNormalize,
//   productArrayNormalize,
//   denormalizeProduct,
//   denormalizeProductArray
// }
