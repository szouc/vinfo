// @flow

import { createApiRoute } from '../routes'

export const CAPTAIN_ROOT_ROUTE = '/captain'
export const CAPTAIN_ID_ROUTE = '/:username'
export const CAPTAIN_FUEL_ROUTE = '/:username/fuel'
export const CAPTAIN_FUEL_ID_ROUTE = '/:username/fuel/:childId'
export const CAPTAIN_MAINTAIN_ROUTE = '/:username/maintenance'
export const CAPTAIN_MAINTAIN_ID_ROUTE = '/:username/maintenance/:childId'
export const CAPTAIN_TRANSPORT_ROUTE = '/:username/transport'
export const CAPTAIN_TRANSPORT_ID_ROUTE = '/:username/transport/:childId'

// Exposing to API
export const CAPTAIN_ROOT_API = createApiRoute(CAPTAIN_ROOT_ROUTE)
export const CAPTAIN_ID_API = createApiRoute(
  CAPTAIN_ROOT_ROUTE,
  CAPTAIN_ID_ROUTE
)
export const DRIVER_FUEL_API = createApiRoute(
  CAPTAIN_ROOT_ROUTE,
  CAPTAIN_FUEL_ROUTE
)
export const CAPTAIN_MAINTAIN_API = createApiRoute(
  CAPTAIN_ROOT_ROUTE,
  CAPTAIN_MAINTAIN_ROUTE
)
export const CAPTAIN_TRANSPORT_API = createApiRoute(
  CAPTAIN_ROOT_ROUTE,
  CAPTAIN_TRANSPORT_ROUTE
)
export const CAPTAIN_FUEL_ID_API = createApiRoute(
  CAPTAIN_ROOT_ROUTE,
  CAPTAIN_FUEL_ID_ROUTE
)
export const CAPTAIN_MAINTAIN_ID_API = createApiRoute(
  CAPTAIN_ROOT_ROUTE,
  CAPTAIN_MAINTAIN_ID_ROUTE
)
export const CAPTAIN_TRANSPORT_ID_API = createApiRoute(
  CAPTAIN_ROOT_ROUTE,
  CAPTAIN_TRANSPORT_ID_ROUTE
)
