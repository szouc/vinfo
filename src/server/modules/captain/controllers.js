import { User, Vehicle, Transport } from './models'
import { ASSIGN, ACCEPT, SUBMIT } from './constants'

function getCaptainByUsername(req, res) {
  User.findByUsername(req.params.username)
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No captian matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find captian by id')
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

function getAllCaptainVehicles(req, res) {
  Vehicle.find({
    'captain.username': req.params.username
  })
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(() => {
      res.status(500).send('Couldnt fetch all vehicles by username')
    })
}

async function createTransport(req, res) {
  try {
    const transport = req.body
    const vehicle = await Vehicle.findById(transport.vehicle._id)
    if (vehicle.assigned) {
      res.status(400).send('车辆已分配！')
    } else {
      transport.principal = vehicle.principal
      transport.secondary = vehicle.secondary
      const doc = await Promise.all([
        Transport.create(transport),
        Vehicle.findByIdAndUpdate(
          transport.vehicle._id,
          {
            $set: {
              assigned: true
            }
          },
          {
            new: true
          }
        )
      ])
      res.status(200).json(doc)
    }
  } catch (error) {
    res.status(500).send('Couldnt save the transport at this time')
  }
}

function getAllCaptainTransports(req, res) {
  Transport.find({
    'assigner.username': req.params.username,
    active: true
  })
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(() => {
      res.status(500).send('Couldnt fetch all transports by username')
    })
}

function checkFuelById(req, res) {
  Vehicle.findOneAndUpdate(
    {
      'captain.username': req.params.username,
      fuels: {
        $elemMatch: {
          _id: req.params.childId,
          is_check: false
        }
      }
    },
    {
      $set: {
        'fuels.$.is_check': true
      }
    },
    {
      new: true
    }
  )
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('Couldnt find the vehicle by id')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt check fuel by id')
    })
}

function checkMaintainById(req, res) {
  Vehicle.findOneAndUpdate(
    {
      'captain.username': req.params.username,
      maintenance: {
        $elemMatch: {
          _id: req.params.childId,
          is_check: false
        }
      }
    },
    {
      $set: {
        'maintenance.$.is_check': true
      }
    },
    {
      new: true
    }
  )
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('Couldnt find the vehicle by id')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt check maintain by id')
    })
}

function checkTransportById(req, res) {
  Transport.findOneAndUpdate(
    {
      'assigner.username': req.params.username,
      _id: req.params.childId,
      captain_status: { $in: [ASSIGN, ACCEPT, SUBMIT] }
    },
    {
      $set: req.body
    },
    {
      new: true
    }
  )
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('Couldnt find the transport by id')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt check transport by id')
    })
}

// function deleteMaintain(req, res) {
//   Vehicle.findOne({
//     maintenance: {
//       $elemMatch: {
//         _id: req.params.childId,
//         'applicant.username': req.params.username,
//         is_check: false
//       }
//     }
//   })
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
//       res.status(500).send('Couldnt delete maintain by id')
//     })
// }

export {
  // addFuel,
  // getAllFuels,
  // addMaintain,
  // getAllMaintains,
  // deleteMaintain,
  // deleteFuel,
  // createVehicle,
  // getAllVehicles,
  // deleteVehicleById,
  // updateVehicleById,
  checkTransportById,
  createTransport,
  getAllCaptainTransports,
  checkFuelById,
  checkMaintainById,
  getAllCaptainVehicles,
  changePasswordByUsername,
  getCaptainByUsername
}
