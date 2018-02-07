import { Vehicle } from './models'

const generateQueryCallback = (queryError, callback) => {
  if (typeof callback !== 'function') {
    return null
  }
  return (err, doc) => {
    if (err) {
      return callback(err)
    }
    if (!doc) {
      return callback(new Error(queryError))
    }
    callback(null, doc)
  }
}

const createVehicle = (vehicle, callback) => {
  return Vehicle.create(
    vehicle,
    generateQueryCallback('无法创建车辆。', callback)
  )
}

const getVehicles = (pageNumber, pageSize, callback) => {
  return Vehicle.find({ active: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .lean()
    .exec(generateQueryCallback('还没有车辆，请添加。', callback))
}

const getAllVehicles = callback => {
  return Vehicle.find({ active: true })
    .lean()
    .exec(generateQueryCallback('还没有车辆，请添加。', callback))
}

const getVehiclesByQuery = (query, callback) => {
  return Vehicle.find(query)
    .lean()
    .exec(generateQueryCallback('没有找到相关车辆。', callback))
}

const getVehicleByQuery = (query, callback) => {
  return Vehicle.findOne(query)
    .lean()
    .exec(generateQueryCallback('没有找到该车辆。', callback))
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
  return Vehicle.findById(id)
    .lean()
    .exec(generateQueryCallback('没有找到该车辆。', callback))
}

const deleteVehicleById = (id, callback) => {
  return Vehicle.findByIdAndUpdate(
    id,
    { $set: { active: false } },
    { new: true }
  )
    .lean()
    .exec(generateQueryCallback('没有找到该车辆。', callback))
}

const updateVehicleById = (id, update, callback) => {
  return Vehicle.findByIdAndUpdate(id, { $set: update }, { new: true })
    .lean()
    .exec(generateQueryCallback('没有找到该车辆。', callback))
}

const addVehicleFuel = (id, fuelArray, callback) => {
  return Vehicle.findByIdAndUpdate(
    id,
    {
      $addToSet: { fuels: { $each: fuelArray } }
    },
    { new: true }
  )
    .lean()
    .exec(generateQueryCallback('没有找到该车辆。', callback))
}

const addVehicleMaintain = (id, maintainArray, callback) => {
  return Vehicle.findByIdAndUpdate(
    id,
    {
      $addToSet: { maintenance: { $each: maintainArray } }
    },
    { new: true }
  )
    .lean()
    .exec(generateQueryCallback('没有找到该车辆。', callback))
}

const deleteFuelByQuery = (query, fuelId, callback) => {
  Vehicle.findOne(query)
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有找到该车辆。'))
      }
      doc.fuels.id(fuelId).remove()
      return doc.save(generateQueryCallback('无法删除加油记录。', callback))
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
  getVehicles,
  getAllVehicles,
  getVehiclesByQuery,
  getVehicleByQuery,
  getVehicleById,
  deleteVehicleById,
  updateVehicleById
}
