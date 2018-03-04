// @flow

import { createApiPath } from '../routes'
import * as Route from './routes'

// Exposing to API
export const ACCOUNT_ROOT = createApiPath(Route.ACCOUNT_ROOT)

export const ACCOUNT_ID = createApiPath(
  Route.ACCOUNT_ROOT,
  Route.ACCOUNT_ID
)

export const ACCOUNT_STATUS = createApiPath(
  Route.ACCOUNT_ROOT,
  Route.ACCOUNT_STATUS
)
