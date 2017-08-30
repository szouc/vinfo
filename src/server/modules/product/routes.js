// @flow

import { createApiRoute } from '../routes'

export const PRODUCT_ROOT_ROUTE = '/product'
export const PRODUCT_ID_ROUTE = '/:id'
export const PRODUCT_PRICE_HISTORY_ROUTE = '/:id/price_history'
export const PRODUCT_PRICE_HISTORY_ID_ROUTE = '/:id/price_history/:childId'
export const PRODUCT_QUERY_ROUTE = '/search'

// Exposing to API
export const PRODUCT_ROOT_API = createApiRoute(PRODUCT_ROOT_ROUTE)
export const PRODUCT_ID_API = createApiRoute(
  PRODUCT_ROOT_ROUTE,
  PRODUCT_ID_ROUTE
)
export const PRODUCT_PRICE_HISTORY_API = createApiRoute(
  PRODUCT_ROOT_ROUTE,
  PRODUCT_PRICE_HISTORY_ROUTE
)
export const PRODUCT_PRICE_HISTORY_ID_API = createApiRoute(
  PRODUCT_ROOT_ROUTE,
  PRODUCT_PRICE_HISTORY_ID_ROUTE
)
export const PRODUCT_QUERY_API = createApiRoute(
  PRODUCT_ROOT_ROUTE,
  PRODUCT_QUERY_ROUTE
)
