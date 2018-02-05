// @flow

import { createApiPath } from '../routes'
import * as Route from './routes'

// Exposing to API
export const VEHICLE_ROOT = createApiPath(Route.VEHICLE_ROOT)
export const VEHICLE_ALL = createApiPath(Route.VEHICLE_ROOT, Route.VEHICLE_ALL)
export const VEHICLE_ID = createApiPath(Route.VEHICLE_ROOT, Route.VEHICLE_ID)
export const VEHICLE_FUEL = createApiPath(
  Route.VEHICLE_ROOT,
  Route.VEHICLE_FUEL
)
export const VEHICLE_MAINTAIN = createApiPath(
  Route.VEHICLE_ROOT,
  Route.VEHICLE_MAINTAIN
)
export const VEHICLE_FUEL_ID = createApiPath(
  Route.VEHICLE_ROOT,
  Route.VEHICLE_FUEL_ID
)
export const VEHICLE_MAINTAIN_ID = createApiPath(
  Route.VEHICLE_ROOT,
  Route.VEHICLE_MAINTAIN_ID
)
