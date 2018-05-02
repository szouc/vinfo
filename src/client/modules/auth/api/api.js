// @flow

import localforage from 'localforage'
import { fromJS } from 'immutable'
import * as Request from './request'

// response status
const TRUE = true
const STATUS_OK = 200

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
    localforage.setItem('loggedIn', JSON.stringify(true)),
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
  // Logs a user in from the server API
  let response = await Request.login(payload)
  if (response.status === STATUS_OK) {
    await setLocalLogin(payload.username)
    return TRUE
  }
  await setLocalLogout()
  throw new Error('用户名和密码有误')
}

/**
 * Logs the current user out
 */
async function logout() {
  // Logs a user out from the server API
  let response = await Request.logout()
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
  // Fetch a user info from the server API
  let response = await Request.fetchProfile(username)
  if (response.status === STATUS_OK) {
    let user = response.data.result
    return fromJS(user)
  }
  await setLocalLogout()
  throw new Error('Something Wrong at FetchProfile Process')
}

export { getLocalLoggedIn, getLocalUser, login, logout, fetchProfile }
