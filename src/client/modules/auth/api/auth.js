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
const FALSE = false
const STATUS_OK = 200

// This will force localStorage as the storage
// driver even if another is available. You can
// use this instead of `setDriver()`.
localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'auth'
})

/**
 * Checks if a user is logged in at the localStorage
 */
async function isLoggedIn () {
  let loggedIn: ?string = await localforage.getItem('loggedIn')
  let user: ?string = await localforage.getItem('user')
  if (loggedIn && user) {
    return TRUE
  }
  return FALSE
}

/**
 * Set log info to the localStorage
 * @param {string} username - The username of the user
 */
async function setLogin (username: string) {
  await localforage.setItem('loggedIn', true)
  await localforage.setItem('user', username)
}

/**
 * Remove log info in the localStorage
 */
async function setLogout () {
  await localforage.removeItem('loggedIn')
  await localforage.removeItem('user')
}

/**
 *
 * Logs a user in, returning a promise with `true` when done
 *
 * @param {{username: string, password: string}} payload - The username and password of the user
 * @returns
 */
async function login (payload: {username: string, password: string}) {
  // Gets log info from localStorage
  let loggedIn = await isLoggedIn()
  if (loggedIn) {
    return TRUE
  }

  // Fetch options
  let url = WEB_ADDR + AUTH_LOGIN_ROUTE
  let options = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  // Logs a user in from the server API
  let response = await fetch(url, options)
  if (response.status === STATUS_OK) {
    await setLogin(payload.username)
    return TRUE
  }
  if (response.status === 401) {
    await setLogout()
    throw new Error('没有这个用户')
  }
  await setLogout()
  throw new Error('Something Wrong')
}

/**
 * Logs the current user out
 */
async function logout () {
  // Fetch url & options
  let url: string = WEB_ADDR + AUTH_LOGOUT_ROUTE
  let options: {method: string} = {method: 'get'}

  // Logs a user out from the server API
  let response = await fetch(url, options)
  if (response.status === STATUS_OK) {
    await setLogout()
    return TRUE
  }
  throw new Error('Something Wrong')
}

/**
 * Registers a user and then logs them in
 * @param {string} username - The username of the user
 * @return user - The info of the user
 */
async function fetchProfile (username: string) {
  // Fetch url & options
  let url: string = WEB_ADDR + GET_USER_BY_USERNAME_ROUTE.replace(/:username/, username)
  let options: {method: string} = { method: 'get' }

  // Fetch a user info from the server API
  let response = await fetch(url, options)
  if (response.status === STATUS_OK) {
    let user = await response.json()
    return user
  }
  await setLogout()
  throw new Error('Something Wrong')
}

export { isLoggedIn, login, logout, fetchProfile }
