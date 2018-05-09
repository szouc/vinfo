import axios from '@clientSettings/axiosInstance'
import { user as URL } from '@server/exports/api'

const createUser = payload => {
  const config = {
    url: URL.USER_ROOT,
    method: 'post',
    data: payload
  }
  return axios(config)
}

const getAllUsers = () => {
  const config = {
    url: URL.USER_ALL,
    method: 'get'
  }
  return axios(config)
}

const getUsersWithPg = payload => {
  const config = {
    url: URL.USER_ROOT,
    method: 'get',
    params: payload
  }
  return axios(config)
}

const deleteUserByUsername = username => {
  const config = {
    url: URL.USER_ID.replace(/:username/, username),
    method: 'delete'
  }
  return axios(config)
}

const updateUserByUsername = (username, update) => {
  const config = {
    url: URL.USER_ID.replace(/:username/, username),
    method: 'put',
    data: update
  }
  return axios(config)
}

export {
  createUser,
  getAllUsers,
  getUsersWithPg,
  deleteUserByUsername,
  updateUserByUsername
}
