import { Observable } from 'rxjs'
import * as TransportService from './services'
import * as VehicleService from '../vehicle/services'
import { ASSIGN } from './constants.js'

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

const createTransport = (req, res) => {
  const transport = req.body
  const vehicleId = transport.vehicle._id
  const getVehicleById$ = VehicleService.getVehicleById(vehicleId)
  getVehicleById$
    .do(vehicle => {
      if (vehicle && !vehicle.assigned) {
        transport.principal = vehicle.principal
        transport.secondary = vehicle.secondary
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

// const createTransport = async (req, res) => {
//   let transport = req.body
//   try {
//     let vehicle = await VehicleService.getVehicleById(transport.vehicle._id)
//     if (!vehicle || vehicle.assigned) {
//       return res.status(400).json({ ok: false, error: '车辆不存在或已分配！' })
//     }
//     transport.principal = vehicle.principal
//     transport.secondary = vehicle.secondary
//     const doc = await Promise.all([
//       TransportService.createTransport(transport),
//       VehicleService.updateVehicleById(transport.vehicle._id, {
//         assigned: true
//       })
//     ])
//     return res.status(200).json({ ok: true, result: doc })
//   } catch (err) {
//     res.status(400).json({ ok: false, error: err.message })
//   }
// }

const getTransportsWithPagination = (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  const getTransportsWithPagination$ = TransportService.getTransportsWithPg(
    page,
    size
  )
  getTransportsWithPagination$.subscribe(
    createObserver(res, '没有找到相关运输记录。')
  )
}

const getAllTransports = (req, res) => {
  const getAllTransports$ = TransportService.getAllTransports()
  getAllTransports$.subscribe(createObserver(res, '没有找到运输记录。'))
}

const getTransportById = (req, res) => {
  let transportId = req.params.id
  const getTransportById$ = TransportService.getTransportById(transportId)
  getTransportById$.subscribe(createObserver(res, '没有找到相关运输记录。'))
}

const updateTransportById = (req, res) => {
  let transportId = req.params.id
  let update = req.body
  const updateTransportById$ = TransportService.updateTransportById(
    transportId,
    update
  )
  updateTransportById$.subscribe(createObserver(res, '运输记录没有更新成功。'))
}

const deleteTransportById = (req, res) => {
  let transportId = req.params.id
  const deleteTransportById$ = TransportService.deleteTransportById(transportId)
  deleteTransportById$
    .switchMap(transport => {
      if (!transport) {
        return Observable.throw({ message: '运输记录不存在。' })
      }
      if (transport.captain_status === ASSIGN) {
        return VehicleService.updateVehicleById(transport.vehicle._id, {
          assigned: false
        }).map(vehicle => [transport, vehicle])
      }
      return Observable.of([transport, null])
    })
    .subscribe(createObserver(res, '没有相关运输记录。'))
}

// const deleteTransportById = async (req, res) => {
//   let transportId = req.params.id
//   try {
//     const transport = await TransportService.deleteTransportById(transportId)
//     if (!transport) {
//       return res.status(400).json({ ok: false, error: '运输记录不存在。' })
//     }
//     if (transport.captain_status === ASSIGN) {
//       const vehicle = await VehicleService.updateVehicleById(
//         transport.vehicle._id,
//         { assigned: false }
//       )
//       return res.status(200).json({ ok: true, result: [transport, vehicle] })
//     } else {
//       return res.status(200).json({ ok: true, result: [transport, null] })
//     }
//   } catch (err) {
//     res.status(400).json({ ok: false, error: err.message })
//   }
// }

const updateTransportStatusById = (req, res) => {
  let transportId = req.params.id
  let update = req.body
  const updateTransportStatusById$ = TransportService.updateTransportById(
    transportId,
    update
  )
  updateTransportStatusById$
    .switchMap(transport => {
      if (!transport) {
        return Observable.throw({ message: '运输记录不存在。' })
      }
      return VehicleService.updateVehicleById(transport.vehicle._id, {
        assigned: false
      }).map(vehicle => [transport, vehicle])
    })
    .subscribe(createObserver(res, '没有找到相关运输记录。'))
}

// const updateTransportStatusById = async (req, res) => {
//   let transportId = req.params.id
//   let update = req.body
//   try {
//     const transport = await TransportService.updateTransportById(
//       transportId,
//       update
//     )
//     if (!transport) {
//       return res.status(400).json({ ok: false, error: '运输记录不存在。' })
//     }
//     const vehicle = await VehicleService.updateVehicleById(
//       transport.vehicle._id,
//       { assigned: false }
//     )
//     return res.status(200).json({ ok: true, result: [transport, vehicle] })
//   } catch (err) {
//     res.status(400).json({ ok: false, error: err.message })
//   }
// }

export {
  createTransport,
  getTransportsWithPagination,
  getAllTransports,
  updateTransportById,
  deleteTransportById,
  updateTransportStatusById,
  getTransportById
}
