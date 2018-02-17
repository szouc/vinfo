// @flow

import localforage from 'localforage'

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
    localforage.setItem('user', JSON.stringify(username))
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

export default {
  getLocalLoggedIn,
  getLocalUser,
  setLocalLogin,
  setLocalLogout
}
