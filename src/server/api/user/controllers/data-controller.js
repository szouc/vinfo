// @ flow

import User from '../models/person'
import debugCreator from 'debug'

const debug = debugCreator('user')

export const getData = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500).send('Couldnt run the query smart guy')
    }

    res.json({ data: user })
  })
}

export const postData = (req, res) => {
  debug(req.user + ': post ' + req.body)
  const user = new User(req.body)
  user.save((err) => {
    if (err) {
      res.status(500).send('Couldnt save the user at this time')
    }

    res.status(200).send('You have added a new user')
  })
}

export const deleteDataByLastName = (req, res) => {
  User.remove({lastName: req.params.lastName}, (err, user) => {
    if (err) {
      res.status(500).send('Couldnt run the query smart guy')
    }

    res.status(200).send('You have remove a user')
  })
}

export const getDataByLastName = (req, res) => {
  User.find({lastName: req.params.lastName}, (err, user) => {
    if (err) {
      res.status(500).send('Couldnt run the query smart guy')
    }

    res.json({ data: user })
  })
}
