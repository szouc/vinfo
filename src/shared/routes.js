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

// AUTH PATH
export const AUTH_ROOT_ROUTE = '/auth'
export const AUTH_REGISTER_ROUTE = '/register'
export const AUTH_LOGIN_ROUTE = '/login'
export const AUTH_LOGOUT_ROUTE = '/logout'
export const AUTH_RESET_PASSWORD_ROUTE = '/reset_password' // Only Manager Permissions

// API ROOT PATH - '/'
export const API_ROOT_ROUTE = '/api'
export const USER_API_ROOT_ROUTE = '/user'

// USER API PATH - '/user'
export const USER_RESET_PASSWORD_ROUTE = '/:username/reset_password' // Only Owner Permissions
export const GET_USER_BY_USERNAME_ROUTE = '/:username'
