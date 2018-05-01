// @flow

import createImmutableSelector from '@clientUtils/createImmutableSelector'
import { fromJS } from 'immutable'

const productEntity = state => state.getIn(['entities', 'products'])
const productCurrent = state => state.getIn(['product', 'status', 'current'])
const productIds = state => state.getIn(['product', 'status', 'all'])
const priceHistoryEntity = (state, props) =>
  state.getIn(['entities', 'price_histories'])
const priceHistoryIds = (state, props) => fromJS(props.product.priceHistory)

const productSelector = createImmutableSelector(
  [productEntity, productCurrent],
  (product, current) => product.get(current)
)

const productArraySelector = createImmutableSelector(
  [productEntity, productIds],
  (product, ids) => {
    return ids ? ids.map(item => product.get(item)) : []
  }
)

const makePHSelector = () => {
  return createImmutableSelector(
    [priceHistoryEntity, priceHistoryIds],
    (priceHistory, ids) => {
      return ids ? ids.map(item => priceHistory.get(item)) : []
    }
  )
}

export { productSelector, productArraySelector, makePHSelector }
