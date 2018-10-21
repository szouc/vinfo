import { Observable } from 'rxjs'
import * as TransportService from './services'
import * as VehicleService from '../vehicle/services'
import { ASSIGN } from './constants.js'
import { uploadImage, getImageUrl } from '../shared/uploadImage'
import { generateWorkbook } from '../../utils/generateWorkbook'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const SHIPPING_UPLOAD_FIELD = 'shipping'
const SHIPPING_UPLOAD_PATH = 'shipping'

const uploadShippingPic = uploadImage(
  SHIPPING_UPLOAD_FIELD,
  SHIPPING_UPLOAD_PATH
)
const getShippingPicUrl = getImageUrl(SHIPPING_UPLOAD_PATH)

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
  let transport = req.body
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

const getTransportsWithPg = (req, res) => {
  let fromDate = req.query.from
  let toDate = req.query.to
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  const getTransportsWithPagination$ = TransportService.getTransportsWithPg(
    page,
    size,
    {
      fromDate,
      toDate
    }
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
      if (transport.captainStatus === ASSIGN) {
        return VehicleService.updateVehicleById(transport.vehicle, {
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
//     if (transport.captainStatus === ASSIGN) {
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
      return VehicleService.updateVehicleById(transport.vehicle, {
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

const downloadExcel = (req, res) => {
  const columns = [
    { header: '运输号', key: 'num', width: 10 },
    { header: '发单队长', key: 'assignerName', width: 20 },
    { header: '车辆', key: 'plate', width: 20 },
    { header: '发动机号', key: 'engine', width: 30 },
    { header: '第一司机', key: 'principalName', width: 20 },
    { header: '第二司机', key: 'secondaryName', width: 20 },
    { header: '产品名称', key: 'productName', width: 20 },
    { header: '产品规格', key: 'productSpecs', width: 20 },
    { header: '出发公司', key: 'fromName', width: 40 },
    { header: '出发地址', key: 'fromAddr', width: 40 },
    { header: '出发重量', key: 'fromWeight', width: 20 },
    {
      header: '出发时间',
      key: 'fromDate',
      width: 20,
      style: { numFmt: 'yyyy/mm/dd HH:MM' }
    },
    { header: '到达公司', key: 'toName', width: 40 },
    { header: '到达地址', key: 'toAddr', width: 40 },
    { header: '到达重量', key: 'toWeight', width: 20 },
    {
      header: '到达时间',
      key: 'toDate',
      width: 20,
      style: { numFmt: 'yyyy/mm/dd HH:MM' }
    },
    { header: '当前状态', key: 'captainStatus', width: 20 },
    { header: '价格', key: 'price', width: 20 },
    { header: '运单有效', key: 'active', width: 20 },
    {
      header: '创建时间',
      key: 'createdAt',
      width: 20,
      style: { numFmt: 'yyyy/mm/dd HH:MM' }
    },
    {
      header: '更新时间',
      key: 'updatedAt',
      width: 20,
      style: { numFmt: 'yyyy/mm/dd HH:MM' }
    }
  ]

  const getAllTransports$ = TransportService.getAllTransports()
  getAllTransports$.subscribe({
    next: async rows => {
      const workbook = generateWorkbook('运输', columns, rows)
      res.attachment('report.xlsx')
      await workbook.xlsx.write(res)
      return res.end()
    }
  })
}

export {
  createTransport,
  getTransportsWithPg,
  getAllTransports,
  updateTransportById,
  deleteTransportById,
  updateTransportStatusById,
  getTransportById,
  uploadShippingPic,
  getShippingPicUrl,
  downloadExcel
}
