import { Vehicle } from './models'
import {
  generateQueryCallback,
  returnPromiseOrExec,
  addPagination
} from '../../utils/dbService'

const createVehicle = (vehicle, callback) => {
  if (typeof callback === 'function') {
    return Vehicle.create(
      vehicle,
      generateQueryCallback('无法创建车辆。', callback)
    )
  }
  return Vehicle.create(vehicle) // return a 'Promise'
}

const getVehiclesByQuery = (query, callback) => {
  const dbQuery = Vehicle.find(query)
  return returnPromiseOrExec(dbQuery, '没有找到该车辆。', callback)
}

const getAllVehicles = callback => {
  return getVehiclesByQuery({ active: true }, callback)
}

const getVehiclesWithPagination = () =>
  addPagination(getAllVehicles, null, { plate: 1 })

const getVehiclesByUsername = (username, callback) => {
  return getVehiclesByQuery({ 'principal.username': username }, callback)
}

const getUserVehiclesWithPagination = username =>
  addPagination(getVehiclesByUsername, username, { plate: 1 })

const getVehicleByQuery = (query, callback) => {
  const dbQuery = Vehicle.findOne(query)
  return returnPromiseOrExec(dbQuery, '没有找到该车辆。', callback)
}

/**
 * Why not use 'getVehicleByQuery', see differences of the 'findOne' and 'findById':
 *
 * Except for how it treats undefined. If you use findOne(),
 * you'll see that findOne(undefined) and findOne({ _id: undefined }) are
 * equivalent to findOne({}) and return arbitrary documents.
 * However, mongoose translates findById(undefined) into findOne({ _id: null }).
 **/

const getVehicleById = (id, callback) => {
  const dbQuery = Vehicle.findById(id)
  return returnPromiseOrExec(dbQuery, '没有找到该车辆。', callback)
}

const deleteVehicleById = (id, callback) => {
  const dbQuery = Vehicle.findByIdAndUpdate(
    id,
    { $set: { active: false } },
    { new: true }
  )
  return returnPromiseOrExec(dbQuery, '没有找到该车辆。', callback)
}

const updateVehicleById = (id, update, callback) => {
  const dbQuery = Vehicle.findByIdAndUpdate(id, { $set: update }, { new: true })
  return returnPromiseOrExec(dbQuery, '没有找到该车辆。', callback)
}

const addVehicleFuel = (id, fuelArray, callback) => {
  const dbQuery = Vehicle.findByIdAndUpdate(
    id,
    {
      $addToSet: { fuels: { $each: fuelArray } }
    },
    { new: true }
  )
  return returnPromiseOrExec(dbQuery, '没有找到该车辆。', callback)
}

const addVehicleMaintain = (id, maintainArray, callback) => {
  const dbQuery = Vehicle.findByIdAndUpdate(
    id,
    {
      $addToSet: { maintenance: { $each: maintainArray } }
    },
    { new: true }
  )
  return returnPromiseOrExec(dbQuery, '没有找到该车辆。', callback)
}

const deleteFuelByQuery = (query, fuelId, callback) => {
  Vehicle.findOne(query)
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有找到该车辆。'))
      }
      doc.fuels.id(fuelId).remove()
      doc.save(generateQueryCallback('无法删除加油记录。', callback))
    })
    .catch(err => callback(err))
}

const deleteVehicleFuel = (vehicleId, fuelId, callback) => {
  // see differences of the 'findOne' and 'findById'
  if (vehicleId) {
    return deleteFuelByQuery({ _id: vehicleId }, fuelId, callback)
  }
  deleteFuelByQuery({ _id: null }, fuelId, callback)
}

const deleteMaintainByQuery = (query, maintainId, callback) => {
  Vehicle.findOne(query)
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有找到该车辆。'))
      }
      doc.maintenance.id(maintainId).remove()
      return doc.save(generateQueryCallback('无法删除维修记录。', callback))
    })
    .catch(err => callback(err))
}

const deleteVehicleMaintain = (vehicleId, maintainId, callback) => {
  if (vehicleId) {
    return deleteMaintainByQuery({ _id: vehicleId }, maintainId, callback)
  }
  deleteMaintainByQuery({ _id: null }, maintainId, callback)
}

export {
  addVehicleFuel,
  addVehicleMaintain,
  deleteVehicleMaintain,
  deleteVehicleFuel,
  deleteMaintainByQuery,
  deleteFuelByQuery,
  createVehicle,
  getVehiclesWithPagination,
  getVehiclesByUsername,
  getUserVehiclesWithPagination,
  getVehiclesByQuery,
  getVehicleByQuery,
  getAllVehicles,
  getVehicleById,
  deleteVehicleById,
  updateVehicleById
}
