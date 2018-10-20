// @flow

import { createApiPath } from '../routes'
import * as Route from './routes'

// Exposing to API
export const TRANSPORT_ROOT = createApiPath(Route.TRANSPORT_ROOT)
export const TRANSPORT_ALL = createApiPath(
  Route.TRANSPORT_ROOT,
  Route.TRANSPORT_ALL
)
export const TRANSPORT_ID = createApiPath(
  Route.TRANSPORT_ROOT,
  Route.TRANSPORT_ID
)
export const TRANSPORT_STATUS = createApiPath(
  Route.TRANSPORT_ROOT,
  Route.TRANSPORT_STATUS
)
export const TRANSPORT_SHIPPING_PICTURE_UPLOAD = createApiPath(
  Route.TRANSPORT_ROOT,
  Route.TRANSPORT_SHIPPING_PICTURE_UPLOAD
)
export const TRANSPORT_OUTPUT_EXCEL = createApiPath(
  Route.TRANSPORT_ROOT,
  Route.TRANSPORT_OUTPUT_EXCEL
)
