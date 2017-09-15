import { Transport } from './models'
// import { Vehicle } from '../vehicle/models'
import mongoose from 'mongoose'

function createTransport(req, res) {
  // const transport = req.body
  // Vehicle.findById(transport.vehicle)
  // const vehicle = await Vehicle.findById(transport.vehicle)
  // transport.drivers.principal = mongoose.Types.ObjectId(
  //   vehicle.drivers.principal
  // )
  // transport.drivers.secondary = mongoose.Types.ObjectId(
  //   vehicle.drivers.secondary
  // )
  const transport = {
    ...req.body,
    drivers: {
      principal: mongoose.Types.ObjectID('59acecec3884881aa5555555'),
      secondary: mongoose.Types.ObjectID('59acecec3884881aa5555555')
    }
  }

  Transport.create(transport)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(() => {
      res.status(500).send('Couldnt save the transport at this time')
    })
}

export { createTransport }
