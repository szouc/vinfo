import { User, Vehicle, Transport } from './models'
import { ASSIGN, ACCEPT } from './constants'

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

const acceptTransportById = (username, transportId, update, callback) => {
  return Transport.findOneAndUpdate(
    {
      'principal.username': username,
      _id: transportId,
      captain_status: { $in: [ASSIGN, ACCEPT] }
    },
    {
      $set: update
    },
    {
      new: true
    }
  )
    .lean()
    .exec(generateQueryCallback('没有找到该运输记录。', callback))
}

function getVehicleByUsername(req, res) {
  Vehicle.find({
    'principal.username': req.params.username
  })
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No vehicle matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find vehicle by username')
    })
}

function changePasswordByUsername(req, res) {
  User.findByUsername(req.params.username)
    .then(user => {
      user.setPassword(req.body.password, (err, user) => {
        if (err) {
          res.status(500).send('Couldnt reset the password at this time')
        }
        if (user) {
          user
            .save()
            .then(user => {
              res.status(200).json(user)
            })
            .catch(() => {
              res
                .status(500)
                .send('Coudlnt save user at change password operation')
            })
        }
      })
    })
    .catch(() => {
      res.status(500).send('Couldnt find the user')
    })
}

function addFuel(req, res) {
  Vehicle.findByIdAndUpdate(
    req.body.vehicleId,
    {
      $addToSet: { fuels: { $each: req.body.values } }
    },
    { new: true }
  )
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No vehicle matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt add fuel to vehicle')
    })
}

function getAllFuels(req, res) {
  Vehicle.find(
    { fuels: { $elemMatch: { 'applicant.username': req.params.username } } },
    {
      _id: 1,
      plate: 1,
      'fuels.$': 1
    }
  )
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(() => {
      res.status(500).send('Couldnt fetch all fuels')
    })
}

function getAllMaintains(req, res) {
  Vehicle.find(
    {
      maintenance: { $elemMatch: { 'applicant.username': req.params.username } }
    },
    {
      _id: 1,
      plate: 1,
      'maintenance.$': 1
    }
  )
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(() => {
      res.status(500).send('Couldnt fetch all maintains')
    })
}

function addMaintain(req, res) {
  Vehicle.findByIdAndUpdate(
    req.body.vehicleId,
    {
      $addToSet: { maintenance: { $each: req.body.values } }
    },
    { new: true }
  )
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No vehicle matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt add maintain to vehicle')
    })
}

function deleteFuel(req, res) {
  Vehicle.findOne({
    fuels: {
      $elemMatch: {
        _id: req.params.childId,
        'applicant.username': req.params.username,
        is_check: false
      }
    }
  })
    .then(doc => {
      if (doc) {
        doc.fuels.id(req.params.childId).remove()
        return doc.save()
      } else {
        res.status(400).send('Couldnt find the vehicle by id')
      }
    })
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(() => {
      res.status(500).send('Couldnt delete fuel by id')
    })
}

function deleteMaintain(req, res) {
  Vehicle.findOne({
    maintenance: {
      $elemMatch: {
        _id: req.params.childId,
        'applicant.username': req.params.username,
        is_check: false
      }
    }
  })
    .then(doc => {
      if (doc) {
        doc.maintenance.id(req.params.childId).remove()
        return doc.save()
      } else {
        res.status(400).send('Couldnt find the vehicle by id')
      }
    })
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(() => {
      res.status(500).send('Couldnt delete maintain by id')
    })
}

export {
  addFuel,
  getAllFuels,
  addMaintain,
  getAllMaintains,
  deleteMaintain,
  deleteFuel,
  acceptTransportById,
  changePasswordByUsername,
  getVehicleByUsername
}
