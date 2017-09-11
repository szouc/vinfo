// @flow

import { denormalizeProduct, denormalizeProductArray } from './schema'
import createImmutableSelector from '@clientModulesShared/createImmutableSelector'

const productSelector = createImmutableSelector([denormalizeProduct], product => product)

const productArraySelector = createImmutableSelector(
  [denormalizeProductArray],
  products => products
)

export { productSelector, productArraySelector }
