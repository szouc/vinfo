import * as Service from './services'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const generateResponseCallback = res => (err, doc, pagination = {}) => {
  if (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
  res.status(200).json({ ok: true, result: doc, pagination })
}

const createVehicle = (req, res) => {
  let vehicle = req.body
  Service.createVehicle(vehicle, generateResponseCallback(res))
}

const getVehiclesWithPagination = (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  const getVehiclesPage = Service.getVehiclesWithPagination()
  getVehiclesPage(page, size, generateResponseCallback(res))
}

const getAllVehicles = (req, res) => {
  Service.getAllVehicles(generateResponseCallback(res))
}

const getVehicleById = (req, res) => {
  let vehicleId = req.params.id
  Service.getVehicleById(vehicleId, generateResponseCallback(res))
}

const deleteVehicleById = (req, res) => {
  let vehicleId = req.params.id
  Service.deleteVehicleById(vehicleId, generateResponseCallback(res))
}

const updateVehicleById = (req, res) => {
  let vehicleId = req.params.id
  let update = req.body
  Service.updateVehicleById(vehicleId, update, generateResponseCallback(res))
}

const addVehicleFuel = (req, res) => {
  let vehicleId = req.params.id
  let fuelArray = req.body
  Service.addVehicleFuel(vehicleId, fuelArray, generateResponseCallback(res))
}

const addVehicleMaintain = (req, res) => {
  let vehicleId = req.params.id
  let maintainArray = req.body
  Service.addVehicleMaintain(
    vehicleId,
    maintainArray,
    generateResponseCallback(res)
  )
}

const deleteVehicleFuel = (req, res) => {
  let vehicleId = req.params.id
  let fuelId = req.params.childId
  Service.deleteVehicleFuel(vehicleId, fuelId, generateResponseCallback(res))
}

const deleteVehicleMaintain = (req, res) => {
  let vehicleId = req.params.id
  let maintainId = req.params.childId
  Service.deleteVehicleMaintain(
    vehicleId,
    maintainId,
    generateResponseCallback(res)
  )
}

export {
  addVehicleFuel,
  addVehicleMaintain,
  deleteVehicleMaintain,
  deleteVehicleFuel,
  createVehicle,
  getVehiclesWithPagination,
  getAllVehicles,
  getVehicleById,
  deleteVehicleById,
  updateVehicleById
}
