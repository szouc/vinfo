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

const deleteVehicleFuel = (id, childId, callback) => {
  Vehicle.findById(id)
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有找到该车辆。'))
      }
      doc.fuels.id(childId).remove()
      return doc.save(generateQueryCallback('无法删除加油记录。', callback))
    })
    .catch(err => callback(err))
}

const deleteVehicleMaintain = (id, childId, callback) => {
  Vehicle.findById(id)
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有找到该车辆。'))
      }
      doc.maintenance.id(childId).remove()
      return doc.save(generateQueryCallback('无法删除维修记录。', callback))
    })
    .catch(err => callback(err))
}

export {
  addVehicleFuel,
  addVehicleMaintain,
  deleteVehicleMaintain,
  deleteVehicleFuel,
  createVehicle,
  getVehicles,
  getAllVehicles,
  getVehiclesByQuery,
  getVehicleByQuery,
  getVehicleById,
  deleteVehicleById,
  updateVehicleById
}
