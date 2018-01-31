// @ flow

import { User } from './models'

const getUsers = (pageNumber, pageSize, callback) => {
  User.find({ active: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ username: 1 })
    .exec((err, docs) => {
      if (err) {
        return callback(err)
      }
      if (!docs) {
        return callback(new Error('没有用户,请添加。'))
      }
      callback(null, docs)
    })
}

const createUser = (user, callback) => {
  User.register(user, user.password, (err, doc) => {
    if (err) {
      return callback(err)
    }
    if (!doc) {
      return callback(new Error('创建不成功，请检查后继续。'))
    }
    callback(null, doc)
  })
}

const getAllUsers = callback => {
  User.find({ active: true }, (err, docs) => {
    if (err) {
      return callback(err)
    }
    if (!docs) {
      return callback(new Error('没有用户,请添加。'))
    }
    callback(null, docs)
  })
}

const getUsersByRole = (role, callback) => {
  User.find({ role: role, active: true }, (err, docs) => {
    if (err) {
      return callback(err)
    }
    if (!docs) {
      return callback(new Error('没有用户,请添加。'))
    }
    callback(null, docs)
  })
}

const getUserByUsername = (username, callback) => {
  User.findOne({ username: username }, (err, doc) => {
    if (err) {
      return callback(err)
    }
    if (!doc) {
      return callback(new Error('没有这个用户。'))
    }
    callback(null, doc)
  })
}

const deleteUserByUsername = (username, callback) => {
  User.remove({ username: username }, (err, doc) => {
    if (err) {
      return callback(err)
    }
    if (!doc.result.n) {
      // if user is not exist,mongoDB returns the {result: {'n': 0, 'ok': 1}, ...rest}
      return callback(new Error('没有这个用户。'))
    }
    callback(null, doc)
  })
}

const updateUserByUsername = (username, update, callback) => {
  User.findOneAndUpdate(
    { username: username },
    update,
    {
      new: true
    },
    (err, doc) => {
      if (err) {
        return callback(err)
      }
      if (!doc) {
        return callback(new Error('该用户暂时无法修改或不存在。'))
      }
      callback(null, doc)
    }
  )
}

const resetPassword = (username, password, callback) => {
  User.findByUsername(username, (err, user) => {
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
