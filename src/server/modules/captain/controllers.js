import { Observable } from 'rxjs'
import * as UserService from '../user/services'
import * as VehicleService from '../vehicle/services'
import * as TransportService from '../transport/services'
import { CAPTAIN_STATUS } from '../transport/constants'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const createObserver = (res, errHint) => ({
  next: data => {
    if (!data) {
      return res.status(400).json({ ok: false, error: errHint })
    }
    if (data.doc) {
      if (data.doc.length === 0) {
        return res.status(400).json({ ok: false, error: errHint })
      }
      return res
        .status(200)
        .json({ ok: true, result: data.doc, pagination: data.pagination })
    }
    if (data.ok) {
      if (data.n === 0) {
        return res.status(400).json({ ok: false, error: errHint })
      }
    }
    return res.status(200).json({ ok: true, result: data })
  },
  error: err => {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

const getCaptainByUsername = (req, res) => {
  let username = req.params.username
  const getCaptainByUsername$ = UserService.getUserByUsername(username)
  getCaptainByUsername$.subscribe(createObserver(res, '没有找到相关用户'))
}

const changePasswordByUsername = (req, res) => {
  let username = req.params.username
  let password = req.body.password
  UserService.resetPassword(username, password, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: doc })
  })
}

// function changePasswordByUsername(req, res) {
//   User.findByUsername(req.params.username)
//     .then(user => {
//       user.setPassword(req.body.password, (err, user) => {
//         if (err) {
//           res.status(500).send('Couldnt reset the password at this time')
//         }
//         if (user) {
//           user
//             .save()
//             .then(user => {
//               res.status(200).json(user)
//             })
//             .catch(() => {
//               res
//                 .status(500)
//                 .send('Coudlnt save user at change password operation')
//             })
//         }
//       })
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt find the user')
//     })
// }

const getCaptainVehicles = (req, res) => {
  let fromDate = req.query.from
  let toDate = req.query.to
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  let username = req.params.username
  const getCaptainVehicles$ = VehicleService.getVehiclesWithPg(page, size, {
    captain: username,
    fromDate,
    toDate
  })
  getCaptainVehicles$.subscribe(createObserver(res, '没有找到相关车辆信息。'))
}

const createTransport = (req, res) => {
  const transport = req.body
  const vehicleId = transport.vehicle
  const getVehicleById$ = VehicleService.getVehicleById(vehicleId)
  getVehicleById$
    .do(vehicle => {
      if (vehicle && !vehicle.assigned) {
        transport.principal = vehicle.principal
        transport.principalName = vehicle.principalName
        transport.secondary = vehicle.secondary
        transport.secondaryName = vehicle.secondaryName
      }
    })
    .switchMap(vehicle => {
      if (!vehicle || vehicle.assigned) {
        return Observable.throw({ message: '车辆不存在或已分配。' })
      }
      return Observable.forkJoin(
        TransportService.createTransport(transport),
        VehicleService.updateVehicleById(vehicleId, { assigned: true })
      )
    })
    .subscribe(createObserver(res, '无法创建运输记录。'))
}

// async function createTransport(req, res) {
//   try {
//     const transport = req.body
//     const vehicle = await Vehicle.findById(transport.vehicle._id)
//     if (vehicle.assigned) {
//       res.status(400).send('车辆已分配！')
//     } else {
//       transport.principal = vehicle.principal
//       transport.secondary = vehicle.secondary
//       const doc = await Promise.all([
//         Transport.create(transport),
//         Vehicle.findByIdAndUpdate(
//           transport.vehicle._id,
//           {
//             $set: {
//               assigned: true
//             }
//           },
//           {
//             new: true
//           }
//         )
//       ])
//       res.status(200).json(doc)
//     }
//   } catch (error) {
//     res.status(500).send('Couldnt save the transport at this time')
//   }
// }

const getCaptainTransports = (req, res) => {
  let fromDate = req.query.from
  let toDate = req.query.to
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  let username = req.params.username
  let captainStatus = req.query.captainStatus
  const getCaptainTransports$ = TransportService.getTransportsWithPg(
    page,
    size,
    {
      captain: username,
      captainStatus,
      fromDate,
      toDate
    }
  )
  getCaptainTransports$.subscribe(createObserver(res, '没有相关运输记录。'))
}

// function getCaptainTransports(req, res) {
//   Transport.find({
//     'assigner.username': req.params.username,
//     active: true
//   })
//     .then(docs => {
//       res.status(200).json(docs)
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt fetch all transports by username')
//     })
// }

const checkFuelById = (req, res) => {
  let username = req.params.username
  let fuelId = req.params.childId
  const checkFuelById$ = VehicleService.checkFuelById(username, fuelId)
  checkFuelById$.subscribe(createObserver(res, '没有找到相关加油记录。'))
}

// function checkFuelById(req, res) {
//   Vehicle.findOneAndUpdate(
//     {
//       'captain.username': req.params.username,
//       fuels: {
//         $elemMatch: {
//           _id: req.params.childId,
//           isCheck: false
//         }
//       }
//     },
//     {
//       $set: {
//         'fuels.$.isCheck': true
//       }
//     },
//     {
//       new: true
//     }
//   )
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('Couldnt find the vehicle by id')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt check fuel by id')
//     })
// }

const checkMaintainById = (req, res) => {
  let username = req.params.username
  let maintainId = req.params.childId
  const checkMaintainById$ = VehicleService.checkMaintainById(
    username,
    maintainId
  )
  checkMaintainById$.subscribe(createObserver(res, '没有找到相关维修记录。'))
}

// function checkMaintainById(req, res) {
//   Vehicle.findOneAndUpdate(
//     {
//       'captain.username': req.params.username,
//       maintenance: {
//         $elemMatch: {
//           _id: req.params.childId,
//           isCheck: false
//         }
//       }
//     },
//     {
//       $set: {
//         'maintenance.$.isCheck': true
//       }
//     },
//     {
//       new: true
//     }
//   )
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('Couldnt find the vehicle by id')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt check maintain by id')
//     })
// }

const checkTransportById = (req, res) => {
  let username = req.params.username
  let transportId = req.params.childId
  let updateStatus = req.body.status
  if (!CAPTAIN_STATUS.includes(updateStatus)) {
    return res.status(400).json({ ok: false, error: '没有这种状态。' })
  }
  const checkTransportById$ = TransportService.checkTransportById(
    username,
    transportId,
    updateStatus
  )
  checkTransportById$.subscribe(createObserver(res, '没有找到相关运输记录。'))
}

// function checkTransportById(req, res) {
//   Transport.findOneAndUpdate(
//     {
//       'assigner.username': req.params.username,
//       _id: req.params.childId,
//       captainStatus: { $in: [ASSIGN, ACCEPT, SUBMIT] }
//     },
//     {
//       $set: req.body
//     },
//     {
//       new: true
//     }
//   )
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('Couldnt find the transport by id')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt check transport by id')
//     })
// }

// function deleteMaintain(req, res) {
//   Vehicle.findOne({
//     maintenance: {
//       $elemMatch: {
//         _id: req.params.childId,
//         'applicant.username': req.params.username,
//         isCheck: false
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
  getCaptainTransports,
  checkFuelById,
  checkMaintainById,
  getCaptainVehicles,
  changePasswordByUsername,
  getCaptainByUsername
}
