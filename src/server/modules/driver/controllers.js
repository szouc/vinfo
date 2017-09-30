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

// function addVehicleMaintain(req, res) {
//   Vehicle.findByIdAndUpdate(
//     req.params.id,
//     {
//       $addToSet: { maintenance: { $each: req.body } }
//     },
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
//       res.status(500).send('Couldnt add maintenance to vehicle')
//     })
// }

// function deleteVehicleFuel(req, res) {
//   Vehicle.findById(req.params.id)
//     .then(doc => {
//       if (doc) {
//         doc.fuels.id(req.params.childId).remove()
//         return doc.save()
//       } else {
//         res.status(400).send('Couldnt find the vehicle by id')
//       }
//     })
//     .then(doc => {
//       res.status(200).json(doc)
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt delete fuel by id')
//     })
// }

// function deleteVehicleMaintain(req, res) {
//   Vehicle.findById(req.params.id)
//     .then(doc => {
//       if (doc) {
//         doc.maintenance.id(req.params.childId).remove()
//         return doc.save()
//       } else {
//         res.status(400).send('Couldnt find the vehicle by id')
//       }
//     })
//     .then(doc => {
//       res.status(200).json(doc)
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt delete maintenance by id')
//     })
// }

export {
  addFuel,
  // addVehicleMaintain,
  // deleteVehicleMaintain,
  // deleteVehicleFuel,
  // createVehicle,
  // getAllVehicles,
  // deleteVehicleById,
  // updateVehicleById,
  changePasswordByUsername,
  getDriverByUsername
}
