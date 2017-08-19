// @flow

import localforage from 'localforage'
import fetch from '../../shared/settings/fetch'
import { WEB_ADDR } from '../../shared/settings/config'
import {
  AUTH_LOGIN_ROUTE,
  AUTH_LOGOUT_ROUTE,
  GET_USER_BY_USERNAME_ROUTE
} from './routes'

// response status
const TRUE = true
const STATUS_OK = 200
const STATUS_ERROR = 500

/**
 * Checks if a user is logged in at the localStorage
 */
function isLoggedIn () {
  return localforage.getItem('loggedIn')
}

/**
 * Logs a user in, returning a promise with status code
 * @param {Object} payload The username & password of the user
 */
async function login (payload: {username: string, password: string}) {
  // get log status from localStorage
  let loggedIn: ?string = await isLoggedIn()
  if (loggedIn && JSON.parse(loggedIn)) {
    return TRUE
  }

  // fetch options
  let url = WEB_ADDR + AUTH_LOGIN_ROUTE
  let options = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  // async login fetch
  let response = await fetch(url, options)
  if (response.status === STATUS_OK) {
    await localforage.setItem('loggedIn', JSON.stringify(true))
    return TRUE
  }
  if (response.status === 401) {
    await localforage.removeItem('loggedIn')
    throw Error('没有这个用户')
  }
  await localforage.removeItem('loggedIn')
  throw Error('Something Wrong')
}

/**
 * Logs the current user out
 */
async function logout () {
  // fetch url & options
  let url: string = WEB_ADDR + AUTH_LOGOUT_ROUTE
  let options: {method: string} = {method: 'get'}

  // async logout fetch
  try {
    let response = await fetch(url, options)
    if (response.status === STATUS_OK) {
      return STATUS_OK
    }
  } catch (err) {
    return STATUS_ERROR
  }
}

/**
 * Registers a user and then logs them in
 * @param {string} username The username of the user
 */
async function fetchProfile (username: string) {
  // fetch url & options
  let url: string = WEB_ADDR + GET_USER_BY_USERNAME_ROUTE.replace(/:username/, username)
  let options: {method: string} = { method: 'get' }

  // async user profile fetch
  let response = await fetch(url, options)
  if (response.status === STATUS_OK) {
    let data = await response.json()
    return data.user
  }
  throw Error('Something Wrong')
}

export { login, logout, fetchProfile }
