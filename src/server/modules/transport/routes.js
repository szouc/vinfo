// @flow

import { createApiRoute } from '../routes'

export const TRANSPORT_ROOT_ROUTE = '/transport'
export const TRANSPORT_ID_ROUTE = '/:id'
export const TRANSPORT_STATUS_ROUTE = '/:id/status'

// Exposing to API
export const TRANSPORT_ROOT_API = createApiRoute(TRANSPORT_ROOT_ROUTE)
export const TRANSPORT_ID_API = createApiRoute(
  TRANSPORT_ROOT_ROUTE,
  TRANSPORT_ID_ROUTE
)
export const TRANSPORT_STATUS_API = createApiRoute(
  TRANSPORT_ROOT_ROUTE,
  TRANSPORT_STATUS_ROUTE
)
