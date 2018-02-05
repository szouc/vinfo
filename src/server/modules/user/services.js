// @ flow

import { User } from './models'

/*
* Model or Query will Executes immediately if callback function is passed.
* Otherwise, the query statement will return a Promise.
*/
const generateQueryCallback = (queryError, callback) => {
  if (typeof callback !== 'function') {
    return null
  }
  return (err, doc) => {
    if (err) {
      return callback(err)
    }
    if (!doc) {
      return callback(new Error(queryError))
    }
    callback(null, doc)
  }
}

const getUsers = (pageNumber, pageSize, callback) => {
  return User.find({ active: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ username: 1 })
    .lean()
    .exec(generateQueryCallback('没有用户,请添加。', callback))
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
  return User.find({ active: true })
    .lean()
    .exec(generateQueryCallback('没有用户,请添加。', callback))
}

const getUsersByRole = (role, callback) => {
  return User.find({ role: role, active: true })
    .lean()
    .exec(generateQueryCallback('没有用户,请添加。', callback))
}

const getUserByUsername = (username, callback) => {
  return User.findOne({ username: username })
    .lean()
    .exec(generateQueryCallback('没有这个用户。', callback))
}

const deleteUserByUsername = (username, callback) => {
  if (typeof callback !== 'function') {
    return User.remove({ username: username })
  }
  return User.remove({ username: username }, (err, doc) => {
    if (err) {
      return callback(err)
    }
    /* In mongoose v4 if user is not exist,
    * mongoDB returns the {result: {'n': 0, 'ok': 1}, ...rest};
    * In mongoose v5 returns the {'n': 0, 'ok': 1}
    */
    if (!doc.n) {
      return callback(new Error('没有这个用户。'))
    }
    callback(null, username)
  })
}

const updateUserByUsername = (username, update, callback) => {
  return User.findOneAndUpdate({ username: username }, update, {
    new: true
  })
    .lean()
    .exec(generateQueryCallback('该用户暂时无法修改或不存在。', callback))
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
  getUsers,
  getAllUsers,
  getUsersByRole,
  updateUserByUsername,
  deleteUserByUsername,
  createUser,
  getUserByUsername,
  resetPassword
}
