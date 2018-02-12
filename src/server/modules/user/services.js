// @ flow

import { User } from './models'
import {
  generateQueryCallback,
  returnPromiseOrExec,
  addPagination
} from '../../utils/dbService'

const getUsersByQuery = (query, callback) => {
  const dbQuery = User.find(query)
  return returnPromiseOrExec(dbQuery, '没有用户，请添加。', callback)
}

const getUserByQuery = (query, callback) => {
  const dbQuery = User.findOne(query)
  return returnPromiseOrExec(dbQuery, '没有用户，请添加。', callback)
}

const createUser = (user, callback) => {
  // Register must pass the callback function
  return User.register(
    user,
    user.password,
    generateQueryCallback('创建不成功，请检查后继续。', callback)
  )
}

const getAllUsers = callback => {
  return getUsersByQuery({ active: true }, callback)
}

const getUsersWithPagination = query =>
  addPagination(
    getAllUsers,
    query,
    { username: 1 } // sortField
  )

const getUsersByRole = (role, callback) => {
  return getUsersByQuery({ role: role, active: true }, callback)
}

const getUsersByRoleWithPagination = role =>
  addPagination(getUsersByRole, role, { username: 1 })

const getUserByUsername = (username, callback) => {
  return getUserByQuery({ username: username }, callback)
}

const deleteUserByUsername = (username, callback) => {
  if (typeof callback !== 'function') {
    return User.remove({ username: username })
  }
  return User.remove({ username: username }, (err, doc) => {
    if (err) {
      return callback(err)
    }
    /** In mongoose v4 if user is not exist,
     * mongoDB returns the {result: {'n': 0, 'ok': 1}, ...rest};
     * In mongoose v5 returns the {'n': 0, 'ok': 1}
     **/
    if (!doc.n) {
      return callback(new Error('没有这个用户。'))
    }
    callback(null, username)
  })
}

const updateUserByQuery = (query, update, callback) => {
  const dbQuery = User.findOneAndUpdate(query, update, { new: true })
  return returnPromiseOrExec(dbQuery, '没有这个用户。', callback)
}

const updateUserByUsername = (username, update, callback) => {
  return updateUserByQuery({ username: username }, update, callback)
}

const resetPassword = (username, password, callback) => {
  return User.findByUsername(username, (err, user) => {
    if (err) {
      return callback(err)
    }
    if (!user) {
      return callback(new Error('没有找到用户。'))
    }
    user.setPassword(password, (err, newUser) => {
      if (err) {
        return callback(err)
      }
      if (!newUser) {
        return callback(new Error('当前无法更改密码。'))
      }
      user.save((err, doc) => {
        if (err) {
          return callback(err)
        }
        if (!doc) {
          return callback(new Error('当前无法保存更改后的密码。'))
        }
        callback(null, doc)
      })
    })
  })
}

export {
  createUser,
  getUsersWithPagination,
  getAllUsers,
  getUsersByRole,
  getUsersByRoleWithPagination,
  getUserByUsername,
  updateUserByUsername,
  deleteUserByUsername,
  resetPassword
}
