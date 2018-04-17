import * as TransportService from '../transport/services'
import * as UserService from '../user/services'
import * as VehicleService from '../vehicle/services'
import { CAPTAIN_STATUS } from '../transport/constants'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const createObserver = (res, errHint) => ({
  next: data => {
    if (!data) {
      return res.status(200).json({ ok: false, error: errHint })
    }
    if (data.doc) {
      if (data.doc.length === 0) {
        return res.status(200).json({ ok: false, error: errHint })
      }
      return res
        .status(200)
        .json({ ok: true, result: data.doc, pagination: data.pagination })
    }
    if (data.ok) {
      if (data.n === 0) {
        return res.status(200).json({ ok: false, error: errHint })
      }
    }
    return res.status(200).json({ ok: true, result: data })
  },
  error: err => {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

const getDriverTransports = (req, res) => {
  let fromDate = req.query.from
  let toDate = req.query.to
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  let username = req.params.username
  const getDriverTransports$ = TransportService.getTransportsWithPg(
    page,
    size,
    {
      driver: username,
      fromDate,
      toDate
    }
  )
  getDriverTransports$.subscribe(createObserver(res, '没有相关运输记录。'))
}

const updateTransportStatus = (req, res) => {
  let username = req.params.username
  let transportId = req.params.childId
  let updateStatus = req.body.status
  if (!CAPTAIN_STATUS.includes(updateStatus)) {
    return res.status(400).json({ ok: false, error: '没有这种状态。' })
  }
  const updateTransportStatus$ = TransportService.updateStatusByDriver(
    username,
    transportId,
    updateStatus
  )
  updateTransportStatus$.subscribe(
    createObserver(res, '没有找到相关运输记录。')
  )
}

const updateTransport = (req, res) => {
  let username = req.params.username
  let transportId = req.params.childId
  let update = req.body
  const updateTransport$ = TransportService.updateTransportByDriver(
    username,
    transportId,
    update
  )
  updateTransport$.subscribe(
    createObserver(res, '没有找到相关运输记录。')
  )
}

const getDriverByUsername = (req, res) => {
  let username = req.params.username
  const getDriverByUsername$ = UserService.getUserByUsername(username)
  getDriverByUsername$.subscribe(createObserver(res, '没有找到司机信息。'))
}

const getDriverVehicles = (req, res) => {
  let fromDate = req.query.from
  let toDate = req.query.to
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  let username = req.params.username
  const getDriverVehicles$ = VehicleService.getVehiclesWithPg(page, size, {
    driver: username,
    fromDate,
    toDate
  })
  getDriverVehicles$.subscribe(createObserver(res, '还没有相关车辆信息。'))
}

// const getVehiclesBySecondary = (req, res) => {
//   let username = req.params.username
//   let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
//   let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
//   VehicleService.getVehiclesByQuery(
//     {
//       'secondary.username': username
//     },
//     page,
//     size,
//     generateResponseCallback(res)
//   )
// }

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

const addVehicleFuel = (req, res) => {
  let vehicleId = req.body.vehicleId
  let fuelArray = req.body.values
  const addVehicleFuel$ = VehicleService.addVehicleFuel(vehicleId, fuelArray)
  addVehicleFuel$.subscribe(createObserver(res, '没有找到相关车辆信息。'))
}

const addVehicleMaintain = (req, res) => {
  let vehicleId = req.body.vehicleId
  let maintainArray = req.body.values
  const addVehicleMaintain$ = VehicleService.addVehicleMaintain(
    vehicleId,
    maintainArray
  )
  addVehicleMaintain$.subscribe(createObserver(res, '没有找到相关车辆信息。'))
}

const getVehicleFuels = (req, res) => {
  let username = req.params.username
  let vehicleId = req.query.vehicleId
  const getVehicleById$ = VehicleService.getVehicleById(vehicleId)
  getVehicleById$
    .map(vehicle => {
      if (vehicle) {
        const { fuels } = vehicle
        return fuels.filter(item => item.applicant.username === username)
      }
    })
    .subscribe(createObserver(res, '没有找到相关车辆。'))
}

// const getVehicleFuels = async (req, res) => {
//   let username = req.params.username
//   let vehicleId = req.query.vehicleId
//   try {
//     const vehicle = await VehicleService.getVehicleById(vehicleId)
//     if (!vehicle) {
//       return res.status(400).json({ ok: false, error: '没有找到该车辆。' })
//     }
//     const { fuels } = vehicle
//     const fuelArray = fuels.filter(item => {
//       return item.applicant.username === username
//     })
//     return res.status(200).json({ ok: true, result: fuelArray })
//   } catch (err) {
//     res.status(400).json({ ok: false, error: err.message })
//   }
// }

const getVehicleMaintains = (req, res) => {
  let username = req.params.username
  let vehicleId = req.query.vehicleId
  const getVehicleById$ = VehicleService.getVehicleById(vehicleId)
  getVehicleById$
    .map(vehicle => {
      if (vehicle) {
        const { maintenance } = vehicle
        return maintenance.filter(item => item.applicant.username === username)
      }
    })
    .subscribe(createObserver(res, '没有找到相关车辆。'))
}

// const getVehicleMaintains = async (req, res) => {
//   let username = req.params.username
//   let vehicleId = req.query.vehicleId
//   try {
//     const vehicle = await VehicleService.getVehicleById(vehicleId)
//     if (!vehicle) {
//       return res.status(400).json({ ok: false, error: '没有找到该车辆。' })
//     }
//     const { maintenance } = vehicle
//     const maintainArray = maintenance.filter(item => {
//       return item.applicant.username === username
//     })
//     return res.status(200).json({ ok: true, result: maintainArray })
//   } catch (err) {
//     res.status(400).json({ ok: false, error: err.message })
//   }
// }

const deleteVehicleFuel = (req, res) => {
  let username = req.params.username
  let fuelId = req.params.childId
  const deleteVehicleFuel$ = VehicleService.deleteOwnFuel(username, fuelId)
  deleteVehicleFuel$.subscribe(createObserver(res, '没有找到相关加油记录。'))
}

const deleteVehicleMaintain = (req, res) => {
  let username = req.params.username
  let maintainId = req.params.childId
  const deleteVehicleMaintain$ = VehicleService.deleteOwnMaintain(
    username,
    maintainId
  )
  deleteVehicleMaintain$.subscribe(
    createObserver(res, '没有找到相关维修记录。')
  )
}

export {
  addVehicleFuel,
  getVehicleFuels,
  addVehicleMaintain,
  getVehicleMaintains,
  deleteVehicleMaintain,
  deleteVehicleFuel,
  getDriverTransports,
  updateTransport,
  updateTransportStatus,
  changePasswordByUsername,
  getDriverVehicles,
  // getVehiclesBySecondary,
  getDriverByUsername
}
