// @flow

// example
export const HOME_PAGE_ROUTE = '/'
export const HELLO_PAGE_ROUTE = '/hello'
export const HELLO_ASYNC_PAGE_ROUTE = '/hello-async'
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'

// user
export const USER_REGISTER_ROUTE = '/register'
export const USER_LOGIN_ROUTE = '/login'

// eslint-disable-next-line
export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`

// API PATH

export const API_ROOT_ROUTE = '/api'
export const USER_API_ROOT_ROUTE = '/user'
