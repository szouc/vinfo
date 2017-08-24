// @flow

// example
export const HOME_PAGE_ROUTE = '/'
export const HELLO_PAGE_ROUTE = '/hello'
export const HELLO_ASYNC_PAGE_ROUTE = '/hello-async'
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'

// eslint-disable-next-line
export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`

// const route = {
//   root: {
//     url: '/',
//     children: {
//       auth: {
//         url: '/auth',
//         children: {
//           register: {
//             url: '/register'
//           },
//           login: {
//             url: '/login'
//           },
//           logout: {
//             url: '/logout'
//           },
//           reset_password: {
//             url: '/reset_password'
//           }
//         }
//       },
//       api: {
//         url: '/api',
//         children: {
//           user: {
//             url: '/user',
//             children: {
//               getUserByUsername: {
//                 url: '/:username'
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

const createRootRoute = (rootPath: string) => (...relativePath: Array<string>): ?string => {
  return rootPath + relativePath.reduce((pre, cur) => pre + cur)
}

export const RELATIVE_ROOT_ROUTE = '/'

// AUTH PATH
export const AUTH_ROOT_ROUTE = '/auth'
const createAuthRoute = createRootRoute(AUTH_ROOT_ROUTE)

export const RELATIVE_AUTH_REGISTER_ROUTE = '/register'
export const RELATIVE_AUTH_LOGIN_ROUTE = '/login'
export const RELATIVE_AUTH_LOGOUT_ROUTE = '/logout'
export const RELATIVE_AUTH_RESET_PASSWORD_ROUTE = '/reset_password' // Only Manager Permissions
export const AUTH_REGISTER_ROUTE = createAuthRoute(RELATIVE_AUTH_REGISTER_ROUTE)
export const AUTH_LOGIN_ROUTE = createAuthRoute(RELATIVE_AUTH_LOGIN_ROUTE)
export const AUTH_LOGOUT_ROUTE = createAuthRoute(RELATIVE_AUTH_LOGOUT_ROUTE)
export const AUTH_RESET_PASSWORD_ROUTE = createAuthRoute(RELATIVE_AUTH_RESET_PASSWORD_ROUTE) // Only Manager Permissions

// API ROOT PATH - '/'
export const API_ROOT_ROUTE = '/api'
const createApiRoute = createRootRoute(API_ROOT_ROUTE)

export const RELATIVE_API_USER_ROOT_ROUTE = '/user'
export const API_USER_ROOT_ROUTE = createApiRoute(RELATIVE_API_USER_ROOT_ROUTE)

export const RELATIVE_USER_RESET_PASSWORD_ROUTE = '/:username/reset_password' // Only Owner Permissions
export const RELATIVE_GET_USER_BY_USERNAME_ROUTE = '/:username'
export const USER_RESET_PASSWORD_ROUTE = createApiRoute(RELATIVE_API_USER_ROOT_ROUTE, RELATIVE_USER_RESET_PASSWORD_ROUTE) // Only Owner Permissions
export const GET_USER_BY_USERNAME_ROUTE = createApiRoute(RELATIVE_API_USER_ROOT_ROUTE, RELATIVE_GET_USER_BY_USERNAME_ROUTE)
