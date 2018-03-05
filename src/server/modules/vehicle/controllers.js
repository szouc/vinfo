import * as Service from './services'

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

const createVehicle = (req, res) => {
  let vehicle = req.body
  const createVehicle$ = Service.createVehicle(vehicle)
  createVehicle$.subscribe(createObserver(res, '无法创建车辆信息。'))
}

const getVehiclesWithPg = (req, res) => {
  let fromDate = req.query.from
  let toDate = req.query.to
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  const getVehiclesWithPagination$ = Service.getVehiclesWithPg(
    page,
    size,
    {
      fromDate,
      toDate
    }
  )
  getVehiclesWithPagination$.subscribe(
    createObserver(res, '没有找到相关车辆信息。')
  )
}

const getAllVehicles = (req, res) => {
  const getAllVehicles$ = Service.getAllVehicles()
  getAllVehicles$.subscribe(createObserver(res, '没有找到车辆。'))
}

const getVehicleById = (req, res) => {
  let vehicleId = req.params.id
  const getVehicleById$ = Service.getVehicleById(vehicleId)
  getVehicleById$.subscribe(createObserver(res, '没有找到相关车辆。'))
}

const deleteVehicleById = (req, res) => {
  let vehicleId = req.params.id
  const deleteVehicleById$ = Service.deleteVehicleById(vehicleId)
  deleteVehicleById$.subscribe(createObserver(res, '无法删除车辆信息。'))
}

const updateVehicleById = (req, res) => {
  let vehicleId = req.params.id
  let update = req.body
  const updateVehicleById$ = Service.updateVehicleById(vehicleId, update)
  updateVehicleById$.subscribe(createObserver(res, '无法更新车辆信息。'))
}

const addVehicleFuel = (req, res) => {
  let vehicleId = req.params.id
  let fuelArray = req.body
  const addVehicleFuel$ = Service.addVehicleFuel(vehicleId, fuelArray)
  addVehicleFuel$.subscribe(createObserver(res, '无法添加加油信息。'))
}

const addVehicleMaintain = (req, res) => {
  let vehicleId = req.params.id
  let maintainArray = req.body
  const addVehicleMaintain$ = Service.addVehicleMaintain(
    vehicleId,
    maintainArray
  )
  addVehicleMaintain$.subscribe(createObserver(res, '无法添加维修信息。'))
}

const deleteVehicleFuel = (req, res) => {
  let vehicleId = req.params.id
  let fuelId = req.params.childId
  const deleteVehicleFuel$ = Service.deleteVehicleFuel(vehicleId, fuelId)
  deleteVehicleFuel$.subscribe(createObserver(res, '无法删除加油信息。'))
}

const deleteVehicleMaintain = (req, res) => {
  let vehicleId = req.params.id
  let maintainId = req.params.childId
  const deleteVehicleMaintain$ = Service.deleteVehicleMaintain(
    vehicleId,
    maintainId
  )
  deleteVehicleMaintain$.subscribe(createObserver(res, '无法删除维修信息。'))
}

export {
  addVehicleFuel,
  addVehicleMaintain,
  deleteVehicleMaintain,
  deleteVehicleFuel,
  createVehicle,
  getVehiclesWithPg,
  getAllVehicles,
  getVehicleById,
  deleteVehicleById,
  updateVehicleById
}
