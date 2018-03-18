// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import * as Request from './request'
import { userNormalize, userArrayNormalize } from '@clientSettings/schema'

const STATUS_OK = 200

async function createUser(payload: Immut): ?Immut {
  const response = await Request.createUser(payload)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const user = userNormalize(data)
    return fromJS(user)
  }
  throw new Error('Couldnt create a new user')
}

async function getAllUsers(): ?Immut {
  const response = await Request.getAllUsers()
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const user = userArrayNormalize(data)
    return fromJS(user)
  }
  throw new Error('Something wrong at getAllCompanies Process')
}

async function getUsersWithPg(payload: {
  pageNumber: Number,
  pageSize: Number,
  fromDate: String,
  toDate: String
}): ?Immut {
  const response = await Request.getUsersWithPg(
    payload.pageNumber,
    payload.pageSize,
    payload.fromDate,
    payload.toDate
  )
  if (response.status === STATUS_OK) {
    const { result, pagination } = response.data
    const users = userArrayNormalize(result)
    return fromJS({ user: users, pagination })
  }
  throw new Error('Something wrong at getUsersWithPg Process')
}

async function deleteUserByUsername(username: string) {
  const response = await Request.deleteUserByUsername(username)
  if (response.status === STATUS_OK) {
    return fromJS({ username: username })
  }
  throw new Error('Something wrong at deleteUserByUsername Process')
}

async function updateUserByUsername(payload: Immut) {
  const username = payload.get('username')
  const update = payload.get('values')
  const response = await Request.updateUserByUsername(username, update)
  if (response) {
    const data = response.data.result
    const user = userNormalize(data)
    return fromJS(user)
  }
  throw new Error('Couldnt update a user by Id')
}

export {
  getAllUsers,
  getUsersWithPg,
  deleteUserByUsername,
  updateUserByUsername,
  createUser
}
