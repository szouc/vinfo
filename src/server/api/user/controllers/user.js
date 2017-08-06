// @ flow

import {
  generateDeleteData,
  generateGetData,
  generatePostData
} from '../../shared/generator'

import User from '../models/user'

const getAllUser = (req, res) => {
  generateGetData(req, res)(User)({})
}

const getOwnUser = (req, res) => {
  generateGetData(req, res)(User)({username: req.user.username})
}

const deleteUserByUsername = (req, res) => {
  generateDeleteData(req, res)(User)({username: req.params.username})
}

const createUser = (req, res) => {
  generatePostData(req, res)(User)(req.body)
}

const getUserByUsername = (req, res) => {
  generateGetData(req, res)(User)({username: req.params.username})
}

export { getAllUser, deleteUserByUsername, createUser, getUserByUsername, getOwnUser }
