// @flow

import localforage from 'localforage'
import fetch from '../../../utils/fetch'
import { WEB_ADDR } from '../../../settings/config'
import { LOGIN_API, LOGOUT_API, GET_USER_BY_USERNAME_API } from './apiRoutes'

// response status
const TRUE = true
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
const getLocalLoggedIn = () => localforage.getItem('loggedIn')

const getLocalUser = () => localforage.getItem('user')

/**
 * Set log info to the localStorage
 * @param {string} username - The username of the user
 */
async function setLocalLogin(username: string) {
  await Promise.all([
    localforage.setItem('loggedIn', true),
    localforage.setItem('user', username)
  ])
}

/**
 * Remove log info in the localStorage
 */
async function setLocalLogout() {
  await Promise.all([
    localforage.removeItem('loggedIn'),
    localforage.removeItem('user')
  ])
}

/**
 *
 * Logs a user in, returning a promise with `true` when done
 *
 * @param {{username: string, password: string}} payload - The username and password of the user
 * @returns
 */
async function login(payload: {
  username: string,
  password: string
}): Promise<boolean> {
  // Gets log info from localStorage
  let loggedIn = await getLocalLoggedIn()
  if (loggedIn) {
    return TRUE
  }

  // Fetch options
  let url = WEB_ADDR + LOGIN_API
  let options = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  // Logs a user in from the server API
  let response = await fetch(url, options)
  if (response.status === STATUS_OK) {
    await setLocalLogin(payload.username)
    return TRUE
  }
  if (response.status === 401) {
    await setLocalLogout()
    throw new Error('用户名和密码有误')
  }
  await setLocalLogout()
  throw new Error('Something Wrong at Login Process')
}

/**
 * Logs the current user out
 */
async function logout() {
  // Fetch url & options
  let url: string = WEB_ADDR + LOGOUT_API
  let options: { method: string } = { method: 'get' }

  // Logs a user out from the server API
  let response = await fetch(url, options)
  if (response.status === STATUS_OK) {
    await setLocalLogout()
    return TRUE
  }
  throw new Error('Something Wrong at Logout Process')
}

/**
 * Registers a user and then logs them in
 * @param {string} username - The username of the user
 * @return user - The info of the user
 */
async function fetchProfile(username: string) {
  // Fetch url & options
  let url: string =
    WEB_ADDR + GET_USER_BY_USERNAME_API.replace(/:username/, username)
  let options: { method: string } = { method: 'get' }

  // Fetch a user info from the server API
  let response = await fetch(url, options)
  if (response.status === STATUS_OK) {
    let user = await response.json()
    return user
  }
  await setLocalLogout()
  throw new Error('Something Wrong at FetchProfile Process')
}

export { getLocalLoggedIn, getLocalUser, login, logout, fetchProfile }
