// @flow

import { createApiPath } from '../routes'
import * as Route from './routes'

// Exposing to API
export const CAPTAIN_ROOT = createApiPath(Route.CAPTAIN_ROOT)
export const CAPTAIN_ID = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_ID
)
export const CAPTAIN_FUEL = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_FUEL
)
export const CAPTAIN_DRIVER = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_DRIVER
)
export const CAPTAIN_VEHICLE = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_VEHICLE
)
export const CAPTAIN_COMPANY = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_COMPANY
)
export const CAPTAIN_PRODUCT = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_PRODUCT
)
export const CAPTAIN_MAINTAIN = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_MAINTAIN
)
export const CAPTAIN_TRANSPORT = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_TRANSPORT
)
export const CAPTAIN_FUEL_ID = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_FUEL_ID
)
export const CAPTAIN_MAINTAIN_ID = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_MAINTAIN_ID
)
export const CAPTAIN_TRANSPORT_ID = createApiPath(
  Route.CAPTAIN_ROOT,
  Route.CAPTAIN_TRANSPORT_ID
)
