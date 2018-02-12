import * as TransportService from './services'
import * as VehicleService from '../vehicle/services'
import { ASSIGN } from './constants.js'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const generateResponseCallback = res => (err, doc, pagination = {}) => {
  if (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
  res.status(200).json({ ok: true, result: doc, pagination })
}

const createTransport = async (req, res) => {
  let transport = req.body
  try {
    let vehicle = await VehicleService.getVehicleById(transport.vehicle._id)
    if (!vehicle || vehicle.assigned) {
      return res.status(400).json({ ok: false, error: '车辆不存在或已分配！' })
    }
    transport.principal = vehicle.principal
    transport.secondary = vehicle.secondary
    const doc = await Promise.all([
      TransportService.createTransport(transport),
      VehicleService.updateVehicleById(transport.vehicle._id, {
        assigned: true
      })
    ])
    return res.status(200).json({ ok: true, result: doc })
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message })
  }
}

const getTransportsWithPagination = (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  const getTransportsPage = TransportService.getTransportsWithPagination()
  getTransportsPage(page, size, generateResponseCallback(res))
}

const getAllTransports = (req, res) => {
  TransportService.getAllTransports(generateResponseCallback(res))
}

const getTransportById = (req, res) => {
  let transportId = req.params.id
  TransportService.getTransportById(transportId, generateResponseCallback(res))
}

const updateTransportById = (req, res) => {
  let transportId = req.params.id
  let update = req.body
  TransportService.updateTransportById(
    transportId,
    update,
    generateResponseCallback(res)
  )
}

const deleteTransportById = async (req, res) => {
  let transportId = req.params.id
  try {
    const transport = await TransportService.deleteTransportById(transportId)
    if (!transport) {
      return res.status(400).json({ ok: false, error: '运输记录不存在。' })
    }
    if (transport.captain_status === ASSIGN) {
      const vehicle = await VehicleService.updateVehicleById(
        transport.vehicle._id,
        { assigned: false }
      )
      return res.status(200).json({ ok: true, result: [transport, vehicle] })
    } else {
      return res.status(200).json({ ok: true, result: [transport, null] })
    }
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message })
  }
}

const updateTransportStatusById = async (req, res) => {
  let transportId = req.params.id
  let update = req.body
  try {
    const transport = await TransportService.updateTransportById(
      transportId,
      update
    )
    if (!transport) {
      return res.status(400).json({ ok: false, error: '运输记录不存在。' })
    }
    const vehicle = await VehicleService.updateVehicleById(
      transport.vehicle._id,
      { assigned: false }
    )
    return res.status(200).json({ ok: true, result: [transport, vehicle] })
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message })
  }
}

export {
  createTransport,
  getTransportsWithPagination,
  getAllTransports,
  updateTransportById,
  deleteTransportById,
  updateTransportStatusById,
  getTransportById
}
