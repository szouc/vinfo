import * as TransportService from '../transport/services'
import * as UserService from '../user/services'
import * as VehicleService from '../vehicle/services'
import { CAPTAIN_STATUS } from '../transport/constants'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const generateResponseCallback = res => (err, doc, pagination = {}) => {
  if (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
  res.status(200).json({ ok: true, result: doc, pagination })
}

const getDriverTransports = (req, res) => {
  let username = req.params.username
  const getDriverTransportsPage = TransportService.getUserTransWithPagination(
    username
  )
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  getDriverTransportsPage(page, size, generateResponseCallback(res))
}

const updateTransportStatus = (req, res) => {
  let username = req.params.username
  let transportId = req.params.childId
  let updateStatus = req.body.status
  if (!CAPTAIN_STATUS.includes(updateStatus)) {
    return res.status(400).json({ ok: false, error: '没有这种状态。' })
  }
  TransportService.updateTransportStatus(
    username,
    transportId,
    updateStatus,
    generateResponseCallback(res)
  )
}

const getDriverByUsername = (req, res) => {
  let username = req.params.username
  UserService.getUserByUsername(username, generateResponseCallback(res))
}

const getVehiclesByPrincipal = (req, res) => {
  let username = req.params.username
  const getVehiclesByPrincipalPage = VehicleService.getUserVehiclesWithPagination(
    username
  )
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  getVehiclesByPrincipalPage(page, size, generateResponseCallback(res))
}

const getVehiclesBySecondary = (req, res) => {
  let username = req.params.username
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  VehicleService.getVehiclesByQuery(
    {
      'secondary.username': username
    },
    page,
    size,
    generateResponseCallback(res)
  )
}

const changePasswordByUsername = (req, res) => {
  let username = req.params.username
  let password = req.body.password
  UserService.resetPassword(username, password, generateResponseCallback(res))
}

const addVehicleFuel = (req, res) => {
  let vehicleId = req.body.vehicleId
  let fuelArray = req.body.values
  VehicleService.addVehicleFuel(
    vehicleId,
    fuelArray,
    generateResponseCallback(res)
  )
}

const getVehicleFuels = async (req, res) => {
  let username = req.params.username
  let vehicleId = req.query.vehicleId
  try {
    const vehicle = await VehicleService.getVehicleById(vehicleId)
    if (!vehicle) {
      return res.status(400).json({ ok: false, error: '没有找到该车辆。' })
    }
    const { fuels } = vehicle
    const fuelArray = fuels.filter(item => {
      return item.applicant.username === username
    })
    return res.status(200).json({ ok: true, result: fuelArray })
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message })
  }
}

const getVehicleMaintains = async (req, res) => {
  let username = req.params.username
  let vehicleId = req.query.vehicleId
  try {
    const vehicle = await VehicleService.getVehicleById(vehicleId)
    if (!vehicle) {
      return res.status(400).json({ ok: false, error: '没有找到该车辆。' })
    }
    const { maintenance } = vehicle
    const maintainArray = maintenance.filter(item => {
      return item.applicant.username === username
    })
    return res.status(200).json({ ok: true, result: maintainArray })
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message })
  }
}

const addVehicleMaintain = (req, res) => {
  let vehicleId = req.body.vehicleId
  let maintainArray = req.body.values
  VehicleService.addVehicleMaintain(
    vehicleId,
    maintainArray,
    generateResponseCallback(res)
  )
}

const deleteVehicleFuel = (req, res) => {
  let username = req.params.username
  let fuelId = req.params.childId
  VehicleService.deleteFuelByQuery(
    {
      fuels: {
        $elemMatch: {
          _id: fuelId,
          'applicant.username': username,
          is_check: false
        }
      }
    },
    fuelId,
    generateResponseCallback(res)
  )
}

const deleteVehicleMaintain = (req, res) => {
  let username = req.params.username
  let maintainId = req.params.childId
  VehicleService.deleteMaintainByQuery(
    {
      maintenance: {
        $elemMatch: {
          _id: maintainId,
          'applicant.username': username,
          is_check: false
        }
      }
    },
    maintainId,
    generateResponseCallback(res)
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
  updateTransportStatus,
  changePasswordByUsername,
  getVehiclesByPrincipal,
  getVehiclesBySecondary,
  getDriverByUsername
}
