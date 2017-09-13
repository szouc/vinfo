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

export { createVehicle }
