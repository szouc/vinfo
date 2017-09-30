import { User, Vehicle } from './models'

// function createVehicle(req, res) {
//   Vehicle.create(req.body)
//     .then(doc => {
//       res.status(200).json(doc)
//     })
//     .catch(e => {
//       res.status(500).send('Couldnt save the vehicle at this time')
//     })
// }

// function getAllVehicles(req, res) {
//   Vehicle.find({ active: true })
//     .lean()
//     .then(docs => {
//       if (docs) {
//         res.status(200).json(docs)
//       } else {
//         res.status(400).send('No vehicles matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt find all vehicles')
//     })
// }

function getDriverByUsername(req, res) {
  User.findByUsername(req.params.username)
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No driver matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find driver by id')
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

// function deleteVehicleById(req, res) {
//   Vehicle.findByIdAndUpdate(
//     req.params.id,
//     { $set: { active: false } },
//     { new: true }
//   )
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('No vehicle matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt delete vehicle at this time')
//     })
// }

// function updateVehicleById(req, res) {
//   Vehicle.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('NO vehicle matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt update vehicle at this time')
//     })
// }

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
  // createVehicle,
  // getAllVehicles,
  // deleteVehicleById,
  // updateVehicleById,
  changePasswordByUsername,
  getDriverByUsername
}
