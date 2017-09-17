import { Vehicle } from './models'

function createVehicle(req, res) {
  Vehicle.create(req.body)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(e => {
      res.status(500).send('Couldnt save the vehicle at this time')
    })
}

function getAllVehicles(req, res) {
  Vehicle.find({ active: true })
    .populate('drivers.principal')
    .populate('drivers.secondary')
    .populate('fuels.applicant')
    .populate('maintenance.applicant')
    .lean()
    .then(docs => {
      if (docs) {
        res.status(200).json(docs)
      } else {
        res.status(400).send('No vehicles matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find all vehicles')
    })
}

function getVehicleById(req, res) {
  Vehicle.findById(req.params.id)
    .populate('drivers.principal')
    .populate('drivers.secondary')
    .populate('fuels.applicant')
    .populate('maintenance.applicant')
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No vehicle matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find vehicle by id')
    })
}

function deleteVehicleById(req, res) {
  Vehicle.findByIdAndUpdate(
    req.params.id,
    { $set: { active: false } },
    { new: true }
  )
    .populate('drivers.principal')
    .populate('drivers.secondary')
    .populate('fuels.applicant')
    .populate('maintenance.applicant')
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No vehicle matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt delete vehicle at this time')
    })
}

function updateVehicleById(req, res) {
  Vehicle.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .populate('drivers.principal')
    .populate('drivers.secondary')
    .populate('fuels.applicant')
    .populate('maintenance.applicant')
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('NO vehicle matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt update vehicle at this time')
    })
}

function addVehicleFuel(req, res) {
  Vehicle.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { fuels: { $each: req.body } }
    },
    { new: true }
  )
    .populate('drivers.principal')
    .populate('drivers.secondary')
    .populate('fuels.applicant')
    .populate('maintenance.applicant')
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

function addVehicleMaintain(req, res) {
  Vehicle.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { maintenance: { $each: req.body } }
    },
    { new: true }
  )
    .populate('drivers.principal')
    .populate('drivers.secondary')
    .populate('fuels.applicant')
    .populate('maintenance.applicant')
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No vehicle matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt add maintenance to vehicle')
    })
}

function deleteVehicleFuel(req, res) {
  Vehicle.findById(req.params.id)
    .populate('drivers.principal')
    .populate('drivers.secondary')
    .populate('fuels.applicant')
    .populate('maintenance.applicant')
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

function deleteVehicleMaintain(req, res) {
  Vehicle.findById(req.params.id)
    .populate('drivers.principal')
    .populate('drivers.secondary')
    .populate('fuels.applicant')
    .populate('maintenance.applicant')
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
      res.status(500).send('Couldnt delete maintenance by id')
    })
}

export {
  addVehicleFuel,
  addVehicleMaintain,
  deleteVehicleMaintain,
  deleteVehicleFuel,
  createVehicle,
  getAllVehicles,
  getVehicleById,
  deleteVehicleById,
  updateVehicleById
}
