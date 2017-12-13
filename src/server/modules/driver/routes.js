// @flow

import { createApiRoute } from '../routes'

export const DRIVER_ROOT_ROUTE = '/driver'
export const DRIVER_ID_ROUTE = '/:username'
export const DRIVER_VEHICLE_ROUTE = '/:username/vehicle'
export const DRIVER_FUEL_ROUTE = '/:username/fuel'
export const DRIVER_FUEL_ID_ROUTE = '/:username/fuel/:childId'
export const DRIVER_MAINTAIN_ROUTE = '/:username/maintenance'
export const DRIVER_MAINTAIN_ID_ROUTE = '/:username/maintenance/:childId'
export const DRIVER_TRANSPORT_ROUTE = '/:username/transport'
export const DRIVER_TRANSPORT_ID_ROUTE = '/:username/transport/:childId'

// Exposing to API
export const DRIVER_ROOT_API = createApiRoute(DRIVER_ROOT_ROUTE)
export const DRIVER_ID_API = createApiRoute(
  DRIVER_ROOT_ROUTE,
  DRIVER_ID_ROUTE
)
export const DRIVER_VEHICLE_API = createApiRoute(
  DRIVER_ROOT_ROUTE,
  DRIVER_VEHICLE_ROUTE
)
export const DRIVER_FUEL_API = createApiRoute(
  DRIVER_ROOT_ROUTE,
  DRIVER_FUEL_ROUTE
)
export const DRIVER_MAINTAIN_API = createApiRoute(
  DRIVER_ROOT_ROUTE,
  DRIVER_MAINTAIN_ROUTE
)
export const DRIVER_TRANSPORT_API = createApiRoute(
  DRIVER_ROOT_ROUTE,
  DRIVER_TRANSPORT_ROUTE
)
export const DRIVER_FUEL_ID_API = createApiRoute(
  DRIVER_ROOT_ROUTE,
  DRIVER_FUEL_ID_ROUTE
)
export const DRIVER_MAINTAIN_ID_API = createApiRoute(
  DRIVER_ROOT_ROUTE,
  DRIVER_MAINTAIN_ID_ROUTE
)
export const DRIVER_TRANSPORT_ID_API = createApiRoute(
  DRIVER_ROOT_ROUTE,
  DRIVER_TRANSPORT_ID_ROUTE
)
