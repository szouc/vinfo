// @ flow

import { User } from './models'

const uploadUserLicense = (req, res) => {
  const file = req.file
  const imageUrl = `/static/uploads/license/${file.filename}`
  res.status(200).json(imageUrl)
}

const uploadUserIdFront = (req, res) => {
  const file = req.file
  const imageUrl = `/static/uploads/id_front/${file.filename}`
  res.status(200).json(imageUrl)
}

const uploadUserIdBack = (req, res) => {
  const file = req.file
  const imageUrl = `/static/uploads/id_back/${file.filename}`
  res.status(200).json(imageUrl)
}

const getAllUsers = (req, res) => {
  User.find({ active: true })
    .lean()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(() => {
      res.status(500).send('Couldnt run the query smart guy')
    })
}

const getOwnUser = (req, res) => {
  User.find({ username: req.user.username })
    .then(document => {
      res.json({ data: document })
    })
    .catch(() => {
      res.status(500).send('Couldnt run the query smart guy')
    })
}

const deleteUserByUsername = (req, res) => {
  const username = req.params.username
  User.remove({ username: username })
    .then(() => {
      res.status(200).send(username)
    })
    .catch(() => {
      res.status(500).send('Couldnt remove the user at this time')
    })
}

const createUser = (req, res) => {
  User.register(req.body, req.body.password, (err, user) => {
    if (err) {
      res.status(500).send('Couldnt save the user at this time')
    } else {
      res.status(200).json(user)
    }
  })
  // User.create(req.body)
  //   .then(() => {
  //     res.status(200).send('You have added a new user.')
  //   })
  //   .catch(() => {
  //     res.status(500).send('Couldnt save the user at this time')
  //   })
}

const getUserByUsername = (req, res) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(() => {
      res.status(500).send('Couldnt run the query smart guy')
    })
}

const resetPassword = (req, res, next) => {
  User.findByUsername(req.body.username, (err, user) => {
    if (err) {
      return next(err)
    }
    if (user) {
      user.setPassword(req.body.password, (err, user) => {
        if (err) {
          return next(err)
        }
        user
          .save()
          .then(user => {
            res.status(200).json(user)
          })
          .catch(() => {
            res.status(500).send('Couldnt reset the password at this time')
          })
      })
    }
  })
}

export {
  getAllUsers,
  deleteUserByUsername,
  uploadUserLicense,
  uploadUserIdFront,
  uploadUserIdBack,
  createUser,
  getUserByUsername,
  getOwnUser,
  resetPassword
}
