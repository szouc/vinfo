// @flow

import { createApiPath } from '../routes'
import * as Route from './routes'

// Exposing to API
export const PRODUCT_ROOT = createApiPath(Route.PRODUCT_ROOT)
export const PRODUCT_ALL = createApiPath(Route.PRODUCT_ROOT, Route.PRODUCT_ALL)
export const PRODUCT_ID = createApiPath(Route.PRODUCT_ROOT, Route.PRODUCT_ID)
export const PRODUCT_PRICE_HISTORY = createApiPath(
  Route.PRODUCT_ROOT,
  Route.PRODUCT_PRICE_HISTORY
)
export const PRODUCT_PRICE_HISTORY_ID = createApiPath(
  Route.PRODUCT_ROOT,
  Route.PRODUCT_PRICE_HISTORY_ID
)
export const PRODUCT_QUERY = createApiPath(
  Route.PRODUCT_ROOT,
  Route.PRODUCT_QUERY
)
