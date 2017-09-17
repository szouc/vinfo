import { Transport } from './models'
import { Vehicle } from '../vehicle/models'
import { SUBMIT, ACCEPT } from './constants.js'

async function createTransport(req, res) {
  try {
    const transport = req.body
    const vehicle = await Vehicle.findById(transport.vehicle._id)
    if (vehicle.assigned) {
      res.status(400).send('车辆已分配！')
    } else {
      transport.drivers = vehicle.drivers
      const doc = await Promise.all([
        Transport.create(transport),
        Vehicle.findByIdAndUpdate(
          transport.vehicle._id,
          { $set: { assigned: true } },
          { new: true }
        )
      ])
      res.status(200).json(doc)
    }
  } catch (error) {
    res.status(500).send('Couldnt save the transport at this time')
  }
}

function getAllTransports(req, res) {
  Transport.find({active: true})
    .lean()
    .then(docs => {
      if (docs) {
        res.status(200).json(docs)
      } else {
        res.status(400).send('No transport matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find all transport')
    })
}

function getTransportById(req, res) {
  Transport.findById(req.params.id)
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No transport matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find transport by id')
    })
}

function updateTransportById(req, res) {
  Transport.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No transport matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt update transport by id')
    })
}

async function deleteTransportById(req, res) {
  try {
    const transport = await Transport.findByIdAndRemove(req.params.id)
    const vehicle = await Vehicle.findByIdAndUpdate(
      transport.vehicle._id,
      {
        $set: { assigned: false }
      },
      { new: true }
    )
    res.status(200).json([transport, vehicle])
  } catch (error) {
    res.status(500).send('Couldnt delete transport status')
  }
}

async function updateTransportStatusById(req, res) {
  if (
    req.user.role === 'driver' &&
    (req.body.status !== ACCEPT && req.body.status !== SUBMIT)
  ) {
    res.status(401).send('Couldnt update other status with dirver_role')
  } else {
    try {
      const transport = await Transport.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
      const vehicle = await Vehicle.findByIdAndUpdate(
        transport.vehicle._id,
        {
          $set: { assigned: false }
        },
        { new: true }
      )
      res.status(200).json([transport, vehicle])
    } catch (error) {
      res.status(500).send('Couldnt update transport status')
    }
  }
}

export {
  createTransport,
  getAllTransports,
  updateTransportById,
  deleteTransportById,
  updateTransportStatusById,
  getTransportById
}
