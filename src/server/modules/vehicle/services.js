import moment from 'moment'
import { Observable } from 'rxjs'
import { Vehicle } from './models'
import * as Page from '../../utils/pagination'

const PROJECTION =
  'plate engine model image purchaseDate initMile principal principalName secondary secondaryName captain captainName fuels maintenance assigned createdAt active'

const createVehicle = vehicle => Observable.fromPromise(Vehicle.create(vehicle))

const getVehiclesByQuery = query =>
  Observable.fromPromise(Vehicle.find(query, PROJECTION).lean())

const getAllVehicles = () => getVehiclesByQuery({ active: true })

const getVehiclesPagination = Page.producePagination(Vehicle)

const getVehiclesData = Page.getModelSortedData(Vehicle, PROJECTION, 'plate')

const getVehiclesWithPg = (pageNumber, pageSize, values = {}) => {
  let activeQuery = { active: true }
  let driverQuery = values.driver ? { 'principal.username': values.driver } : {}
  let captainQuery = values.captain
    ? { 'captain.username': values.captain }
    : {}
  let fromDateQuery = values.fromDate ? { $gte: moment(values.fromDate) } : {}
  let toDateQuery = values.toDate ? { $lte: moment(values.toDate) } : {}
  let dateRangeQuery =
    values.fromDate || values.toDate
      ? { createdAt: { ...fromDateQuery, ...toDateQuery } }
      : {}
  let query = {
    ...activeQuery,
    ...driverQuery,
    ...captainQuery,
    ...dateRangeQuery
  }
  return Page.addPagination(
    getVehiclesPagination(pageNumber, pageSize, query),
    getVehiclesData(pageNumber, pageSize, query)
  )
}

// const getDriverVehiclesWithPg = (pageNumber, pageSize, ...rest) => {
//   const [username] = rest
//   let query = { 'principal.username': username, active: true }
//   return Page.addPagination(
//     getVehiclesPagination(pageNumber, pageSize, query),
//     getVehiclesData(pageNumber, pageSize, query)
//   )
// }

// const getCaptainVehiclesWithPg = (pageNumber, pageSize, ...rest) => {
//   const [username] = rest
//   let query = { 'captain.username': username }
//   return Page.addPagination(
//     getVehiclesPagination(pageNumber, pageSize, query),
//     getVehiclesData(pageNumber, pageSize, query)
//   )
// }

const getVehicleByQuery = query =>
  Observable.fromPromise(Vehicle.findOne(query, PROJECTION).lean())

/**
 * Why not use 'getVehicleByQuery', see differences of the 'findOne' and 'findById':
 *
 * Except for how it treats undefined. If you use findOne(),
 * you'll see that findOne(undefined) and findOne({ _id: undefined }) are
 * equivalent to findOne({}) and return arbitrary documents.
 * However, mongoose translates findById(undefined) into findOne({ _id: null }).
 **/

const getVehicleById = id =>
  Observable.fromPromise(Vehicle.findById(id, PROJECTION).lean())

const deleteVehicleById = id =>
  Observable.fromPromise(
    Vehicle.findByIdAndUpdate(id, { $set: { active: false } }, { new: true })
      .select(PROJECTION)
      .lean()
  )

const updateVehicleById = (id, update) =>
  Observable.fromPromise(
    Vehicle.findByIdAndUpdate(id, { $set: update }, { new: true })
      .select(PROJECTION)
      .lean()
  )

const addVehicleFuel = (id, fuelArray) =>
  Observable.fromPromise(
    Vehicle.findByIdAndUpdate(
      id,
      {
        $addToSet: { fuels: { $each: fuelArray } }
      },
      { new: true }
    )
      .select(PROJECTION)
      .lean()
  )

const addVehicleMaintain = (id, maintainArray) =>
  Observable.fromPromise(
    Vehicle.findByIdAndUpdate(
      id,
      {
        $addToSet: { maintenance: { $each: maintainArray } }
      },
      { new: true }
    )
      .select(PROJECTION)
      .lean()
  )

const deleteFuelByQuery = (query, fuelId) =>
  Observable.fromPromise(Vehicle.findOne(query, PROJECTION))
    .do(doc => {
      if (doc) {
        doc.fuels.id(fuelId).remove()
      }
    })
    .switchMap(doc => {
      if (!doc) {
        return Observable.throw({ message: '没有找到该车辆。' })
      }
      return Observable.fromPromise(doc.save())
    })

// const deleteFuelByQuery = (query, fuelId, callback) => {
//   Vehicle.findOne(query)
//     .then(doc => {
//       if (!doc) {
//         return callback(new Error('没有找到该车辆。'))
//       }
//       doc.fuels.id(fuelId).remove()
//       doc.save(generateQueryCallback('无法删除加油记录。', callback))
//     })
//     .catch(err => callback(err))
// }

const deleteVehicleFuel = (vehicleId, fuelId) => {
  // see differences of the 'findOne' and 'findById'
  if (vehicleId) {
    return deleteFuelByQuery({ _id: vehicleId }, fuelId)
  }
  deleteFuelByQuery({ _id: null }, fuelId)
}

const deleteOwnFuel = (username, fuelId) => {
  let query = {
    fuels: {
      $elemMatch: {
        _id: fuelId,
        'applicant.username': username,
        isCheck: false
      }
    }
  }
  return deleteFuelByQuery(query, fuelId)
}

const deleteMaintainByQuery = (query, maintainId) =>
  Observable.fromPromise(Vehicle.findOne(query, PROJECTION))
    .do(doc => {
      if (doc) {
        doc.maintenance.id(maintainId).remove()
      }
    })
    .switchMap(doc => {
      if (!doc) {
        return Observable.throw({ message: '没有找到相关车辆。' })
      }
      return Observable.fromPromise(doc.save())
    })

// const deleteMaintainByQuery = (query, maintainId, callback) => {
//   Vehicle.findOne(query)
//     .then(doc => {
//       if (!doc) {
//         return callback(new Error('没有找到该车辆。'))
//       }
//       doc.maintenance.id(maintainId).remove()
//       return doc.save(generateQueryCallback('无法删除维修记录。', callback))
//     })
//     .catch(err => callback(err))
// }

const deleteVehicleMaintain = (vehicleId, maintainId) => {
  if (vehicleId) {
    return deleteMaintainByQuery({ _id: vehicleId }, maintainId)
  }
  deleteMaintainByQuery({ _id: null }, maintainId)
}

const deleteOwnMaintain = (username, maintainId) => {
  let query = {
    maintenance: {
      $elemMatch: {
        _id: maintainId,
        'applicant.username': username,
        isCheck: false
      }
    }
  }
  return deleteMaintainByQuery(query, maintainId)
}

const checkFuelById = (username, fuelId) =>
  Observable.fromPromise(
    Vehicle.findOneAndUpdate(
      {
        'captain.username': username,
        fuels: {
          $elemMatch: {
            _id: fuelId,
            isCheck: false
          }
        }
      },
      {
        $set: {
          'fuels.$.isCheck': true
        }
      },
      {
        new: true
      }
    )
      .select(PROJECTION)
      .lean()
  )

const checkMaintainById = (username, maintainId) =>
  Observable.fromPromise(
    Vehicle.findOneAndUpdate(
      {
        'captain.username': username,
        maintenance: {
          $elemMatch: {
            _id: maintainId,
            isCheck: false
          }
        }
      },
      {
        $set: {
          'maintenance.$.isCheck': true
        }
      },
      {
        new: true
      }
    )
      .select(PROJECTION)
      .lean()
  )

export {
  addVehicleFuel,
  addVehicleMaintain,
  deleteVehicleMaintain,
  deleteVehicleFuel,
  deleteMaintainByQuery,
  deleteFuelByQuery,
  createVehicle,
  getVehiclesWithPg,
  // getDriverVehiclesWithPg,
  // getCaptainVehiclesWithPg,
  getVehiclesByQuery,
  getVehicleByQuery,
  getAllVehicles,
  getVehicleById,
  deleteVehicleById,
  deleteOwnFuel,
  deleteOwnMaintain,
  checkFuelById,
  checkMaintainById,
  updateVehicleById
}
