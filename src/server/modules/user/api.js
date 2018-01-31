// @flow

import { createApiPath } from '../routes'
import * as Route from './routes'

// OUTPUT API
export const USER_ROOT = createApiPath(Route.USER_ROOT)
export const USER_ALL = createApiPath(
  Route.USER_ROOT,
  Route.USER_ALL
)
export const USER_ROLE = createApiPath(
  Route.USER_ROOT,
  Route.USER_ROLE
)
export const USER_ID = createApiPath(
  Route.USER_ROOT,
  Route.USER_ID
)
export const USER_RESET_PASSWORD = createApiPath(
  Route.USER_ROOT,
  Route.USER_RESET_PASSWORD
)
export const USER_LICENSE_UPLOAD = createApiPath(
  Route.USER_ROOT,
  Route.USER_LICENSE_UPLOAD
)
export const USER_ID_FRONT_UPLOAD = createApiPath(
  Route.USER_ROOT,
  Route.USER_ID_FRONT_UPLOAD
)
export const USER_ID_BACK_UPLOAD = createApiPath(
  Route.USER_ROOT,
  Route.USER_ID_BACK_UPLOAD
)
