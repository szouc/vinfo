// @ flow

import { Observable } from 'rxjs'
import { User } from './models'
import * as Page from '../../utils/pagination'

const getUsersByQuery = query => Observable.fromPromise(User.find(query))

const getUserByQuery = query => Observable.fromPromise(User.findOne(query))

const createUser = (user, callback) => {
  // Register must pass the callback function
  return User.register(user, user.password, (err, doc) => {
    if (err) {
      return callback(err)
    }
    if (!doc) {
      return callback(new Error('创建不成功，请检查后继续。'))
    }
    return callback(null, doc)
  })
}

const getAllUsers = () => getUsersByQuery({ active: true })

const getUsersPagination = Page.producePagination(User)

const getUsersData = Page.getModelSortedData(User, 'username')

const getUsersWithPagination = (pageNumber, pageSize, ...rest) => {
  let query = { active: true }
  return Page.addPagination(
    getUsersPagination(pageNumber, pageSize, query),
    getUsersData(pageNumber, pageSize, query)
  )
}

const getUsersByRole = role => getUsersByQuery({ role: role, active: true })

const getUsersByRoleWithPagination = (pageNumber, pageSize, ...rest) => {
  let query = { active: true, role: rest[0] }
  return Page.addPagination(
    getUsersPagination(pageNumber, pageSize, query),
    getUsersData(pageNumber, pageSize, query)
  )
}

const getUserByUsername = username => getUserByQuery({ username: username })

/** In mongoose v4 if user is not exist,
 * mongoDB returns the {result: {'n': 0, 'ok': 1}, ...rest};
 * In mongoose v5 returns the {'n': 0, 'ok': 1}
 **/
const deleteUserByUsername = username =>
  Observable.fromPromise(User.remove({ username: username }))

const updateUserByQuery = (query, update) =>
  Observable.fromPromise(User.findOneAndUpdate(query, update, { new: true }))

const updateUserByUsername = (username, update) =>
  updateUserByQuery({ username: username }, update)

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
