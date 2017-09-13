// @flow

import { createApiRoute } from '../routes'

export const VEHICLE_ROOT_ROUTE = '/vehicle'
export const VEHICLE_ID_ROUTE = '/:id'
export const VEHICLE_DRIVER_ROUTE = '/:id/driver'
export const VEHICLE_DRIVER_ID_ROUTE = '/:id/driver/:childId'
export const VEHICLE_FUEL_ROUTE = '/:id/fuel'
export const VEHICLE_FUEL_ID_ROUTE = '/:id/fuel/:childId'
export const VEHICLE_MAINTAIN_ROUTE = '/:id/maintenance'
export const VEHICLE_MAINTAIN_ID_ROUTE = '/:id/maintenance/:childId'

// Exposing to API
export const VEHICLE_ROOT_API = createApiRoute(VEHICLE_ROOT_ROUTE)
export const VEHICLE_ID_API = createApiRoute(
  VEHICLE_ROOT_ROUTE,
  VEHICLE_ID_ROUTE
)
export const VEHICLE_DRIVER_API = createApiRoute(
  VEHICLE_ROOT_ROUTE,
  VEHICLE_DRIVER_ROUTE
)
export const VEHICLE_FUEL_API = createApiRoute(
  VEHICLE_ROOT_ROUTE,
  VEHICLE_FUEL_ROUTE
)
export const VEHICLE_MAINTAIN_API = createApiRoute(
  VEHICLE_ROOT_ROUTE,
  VEHICLE_MAINTAIN_ROUTE
)
export const VEHICLE_DRIVER_ID_API = createApiRoute(
  VEHICLE_ROOT_ROUTE,
  VEHICLE_DRIVER_ID_ROUTE
)
export const VEHICLE_FUEL_ID_API = createApiRoute(
  VEHICLE_ROOT_ROUTE,
  VEHICLE_FUEL_ID_ROUTE
)
export const VEHICLE_MAINTAIN_ID_API = createApiRoute(
  VEHICLE_ROOT_ROUTE,
  VEHICLE_MAINTAIN_ID_ROUTE
)
