import { User, Vehicle, Transport } from './models'
import { ASSIGN, ACCEPT } from './constants'
import * as TransportService from '../transport/services'
import * as UserService from '../user/services'
import * as VehicleService from '../vehicle/services'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const generateResponseCallback = res => (err, doc) => {
  if (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
  res.status(200).json({ ok: true, result: doc })
}

function getDriverTransports(req, res) {
  let username = req.params.username
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  TransportService.getConditionTransports(
    { 'principal.username': username },
    page,
    size,
    generateResponseCallback(res)
  )
}

const acceptTransportById = (req, res) => {
  let username = req.params.username
  let transportId = req.params.childId
  let update = req.body
  TransportService.updateTransportByQuery(
    {
      'principal.username': username,
      _id: transportId,
      captain_status: { $in: [ASSIGN, ACCEPT] }
    },
    update,
    generateResponseCallback(res)
  )
}

const getDriverByUsername = (req, res) => {
  let username = req.params.username
  UserService.getUserByUsername(username, generateResponseCallback(res))
}

const getVehicleByUsername = (req, res) => {
  let username = req.params.username
  VehicleService.getVehicleByQuery(
    {
      'principal.username': username
    },
    generateResponseCallback(res)
  )
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
  getDriverTransports,
  acceptTransportById,
  changePasswordByUsername,
  getVehicleByUsername,
  getDriverByUsername
}
