// @ flow

import { Observable } from 'rxjs'
import moment from 'moment'
import { User } from './models'
import * as Page from '../../utils/pagination'

const PROJECTION =
  'username fullname gender role phone avatar active detail createdAt updatedAt'

const getUsersByQuery = query =>
  Observable.fromPromise(User.find(query, PROJECTION).lean())

const getUserByQuery = query =>
  Observable.fromPromise(User.findOne(query, PROJECTION).lean())

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

/**
 * 根据查询获取用户
 *
 * @param {int} pageNumber
 * @param {int} pageSize
 * @param {object: {role: enum, fromDate: moment, toDate: moment }} values
 * @returns Observable
 */
const getUsersWithPg = (
  pageNumber,
  pageSize,
  values = {},
  projection = PROJECTION
) => {
  const getUsersPagination = Page.producePagination(User)
  const getUsersData = Page.getModelSortedData(User, projection, 'username')
  let active = { active: true }
  let role = values.role ? { role: values.role } : {}
  let fromDate = values.fromDate ? { $gte: moment(values.fromDate) } : {}
  let toDate = values.toDate ? { $lte: moment(values.toDate) } : {}
  let dateRange =
    values.fromDate || values.toDate
      ? { createdAt: { ...fromDate, ...toDate } }
      : {}
  let query = { ...active, ...role, ...dateRange }
  return Page.addPagination(
    getUsersPagination(pageNumber, pageSize, query),
    getUsersData(pageNumber, pageSize, query)
  )
}

/**
 * 获取相关权限用户
 *
 * @param {enum} role
 * @returns Observable
 */
const getUsersByRole = role => getUsersByQuery({ role: role, active: true })

const getUserByUsername = username => getUserByQuery({ username: username })

/** In mongoose v4 if user is not exist,
 * mongoDB returns the {result: {'n': 0, 'ok': 1}, ...rest};
 * In mongoose v5 returns the {'n': 0, 'ok': 1}
 **/
const deleteUserByUsername = username =>
  Observable.fromPromise(User.remove({ username: username }).lean())

const updateUserByQuery = (query, update) =>
  Observable.fromPromise(
    User.findOneAndUpdate(query, update, { new: true })
      .select(PROJECTION)
      .lean()
  )

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
  getUsersWithPg,
  getAllUsers,
  getUsersByRole,
  getUserByUsername,
  updateUserByUsername,
  deleteUserByUsername,
  resetPassword
}
