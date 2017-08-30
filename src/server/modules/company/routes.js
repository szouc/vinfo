// @flow

import { createApiRoute } from '../routes'

export const COMPANY_ROOT_ROUTE = '/company'
export const COMPANY_ID_ROUTE = '/:id'
export const COMPANY_QUERY_ROUTE = '/search'

export const COMPANY_ROOT_API = createApiRoute(COMPANY_ROOT_ROUTE)
export const COMPANY_ID_API = createApiRoute(COMPANY_ROOT_ROUTE, COMPANY_ID_ROUTE)
export const COMPANY_QUERY_API = createApiRoute(COMPANY_ROOT_ROUTE, COMPANY_QUERY_ROUTE)
