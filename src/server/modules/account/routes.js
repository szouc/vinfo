// @flow

import { createApiRoute } from '../routes'

export const ACCOUNT_ROOT_ROUTE = '/account'
export const ACCOUNT_ID_ROUTE = '/:id'
export const ACCOUNT_STATUS_ROUTE = '/:id/account_status'

// Exposing to API
export const ACCOUNT_ROOT_API = createApiRoute(ACCOUNT_ROOT_ROUTE)

export const ACCOUNT_ID_API = createApiRoute(
  ACCOUNT_ROOT_ROUTE,
  ACCOUNT_ID_ROUTE
)

export const ACCOUNT_STATUS_API = createApiRoute(
  ACCOUNT_ROOT_ROUTE,
  ACCOUNT_STATUS_ROUTE
)
