// @ flow

import User from '../models/user'

const getAllUser = (req, res) => {
  User.find({})
    .then((document) => {
      res.json({data: document})
    })
    .catch((e) => {
      res.status(500).send('Couldnt run the query smart guy')
    })
}

const getOwnUser = (req, res) => {
  User.find({username: req.user.username})
    .then((document) => {
      res.json({data: document})
    })
    .catch((e) => {
      res.status(500).send('Couldnt run the query smart guy')
    })
}

const deleteUserByUsername = (req, res) => {
  User.remove({username: req.params.username})
    .then(() => {
      res.status(200).send(`You have removed a user.`)
    })
    .catch((e) => {
      res.status(500).send(`Couldnt remove the user at this time`)
    })
}

const createUser = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.status(200).send(`You have added a new user.`)
    })
    .catch((e) => {
      res.status(500).send(`Couldnt save the user at this time`)
    })
}

const getUserByUsername = (req, res) => {
  User.find({username: req.params.username})
    .then((document) => {
      res.json({data: document})
    })
    .catch((e) => {
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
        user.save()
          .then((user) => {
            res.json(user)
          })
          .catch((e) => {
            res.status(500).send('Couldnt reset the password at this time')
          })
      })
    }
  })
}

export { getAllUser, deleteUserByUsername, createUser, getUserByUsername, getOwnUser, resetPassword }
