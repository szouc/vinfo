// @flow

import { createApiPath } from '../routes'
import * as Route from './routes'

// Exposing to API
export const DRIVER_ROOT = createApiPath(Route.DRIVER_ROOT)
export const DRIVER_ALL = createApiPath(Route.DRIVER_ROOT, Route.DRIVER_ALL)
export const DRIVER_ID = createApiPath(Route.DRIVER_ROOT, Route.DRIVER_ID)
export const DRIVER_VEHICLE = createApiPath(
  Route.DRIVER_ROOT,
  Route.DRIVER_VEHICLE
)
export const DRIVER_FUEL = createApiPath(Route.DRIVER_ROOT, Route.DRIVER_FUEL)
export const DRIVER_MAINTAIN = createApiPath(
  Route.DRIVER_ROOT,
  Route.DRIVER_MAINTAIN
)
export const DRIVER_TRANSPORT = createApiPath(
  Route.DRIVER_ROOT,
  Route.DRIVER_TRANSPORT
)
export const DRIVER_FUEL_ID = createApiPath(
  Route.DRIVER_ROOT,
  Route.DRIVER_FUEL_ID
)
export const DRIVER_MAINTAIN_ID = createApiPath(
  Route.DRIVER_ROOT,
  Route.DRIVER_MAINTAIN_ID
)
export const DRIVER_TRANSPORT_ID = createApiPath(
  Route.DRIVER_ROOT,
  Route.DRIVER_TRANSPORT_ID
)
export const DRIVER_TRANSPORT_ID_STATUS = createApiPath(
  Route.DRIVER_ROOT,
  Route.DRIVER_TRANSPORT_ID_STATUS
)
