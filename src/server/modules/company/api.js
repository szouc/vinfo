// @flow

import { createApiPath } from '../routes'
import * as Route from './routes'

export const COMPANY_ROOT = createApiPath(Route.COMPANY_ROOT)
export const COMPANY_ID = createApiPath(Route.COMPANY_ROOT, Route.COMPANY_ID)
export const COMPANY_QUERY = createApiPath(Route.COMPANY_ROOT, Route.COMPANY_QUERY)
