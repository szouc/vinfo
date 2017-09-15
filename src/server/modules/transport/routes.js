// @flow

import { createApiRoute } from '../routes'

export const TRANSPORT_ROOT_ROUTE = '/transport'
export const TRANSPORT_ID_ROUTE = '/:id'

// Exposing to API
export const TRANSPORT_ROOT_API = createApiRoute(TRANSPORT_ROOT_ROUTE)
export const TRANSPORT_ID_API = createApiRoute(
  TRANSPORT_ROOT_ROUTE,
  TRANSPORT_ID_ROUTE
)
