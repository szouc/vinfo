import { schema, normalize, denormalize } from 'normalizr'

export const userSchema = new schema.Entity('users', {}, { idAttribute: '_id' })

const userNormalize = data => normalize(data, userSchema)
const userArrayNormalize = data => normalize(data, [userSchema])

const denormalizeUser = (entities, id) =>
  denormalize(id, userSchema, entities)
const denormalizeUserArray = (entities, id) =>
  denormalize(id, [userSchema], entities)

export {
  userNormalize,
  userArrayNormalize,
  denormalizeUser,
  denormalizeUserArray
}
