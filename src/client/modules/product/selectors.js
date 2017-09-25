// @flow

import { denormalizeProduct, denormalizeProductArray } from './schema'
import createImmutableSelector from '@clientModulesShared/createImmutableSelector'

const productEntity = state => state.getIn(['product', 'productEntity'])
const productCurrent = state =>
  state.getIn(['product', 'productStatus', 'current'])
const productAll = state => state.getIn(['product', 'productStatus', 'all'])

const productSelector = createImmutableSelector(
  [productEntity, productCurrent],
  (products, id) => denormalizeProduct(products, id)
)

const productArraySelector = createImmutableSelector(
  [productEntity, productAll],
  (products, all) => denormalizeProductArray(products, all)
)

export { productSelector, productArraySelector }
