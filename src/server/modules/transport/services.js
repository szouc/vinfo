import { Transport } from './models'

/*
* Model or Query will Executes immediately if callback function is passed.
* Otherwise, the query statement will return a Promise.
*/
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

const createTransport = (transport, callback) => {
  return Transport.create(
    transport,
    generateQueryCallback('无法创建运输记录。', callback)
  )
}

const getConditionTransports = (query, pageNumber, pageSize, callback) => {
  return Transport.find({ ...query })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ created: -1 })
    .lean()
    .exec(generateQueryCallback('还没有运输记录，请添加。', callback))
}

const getAllTransports = callback => {
  return Transport.find({ active: true })
    .lean()
    .exec(generateQueryCallback('还没有运输记录，请添加。', callback))
}

const getTransportById = (id, callback) => {
  return Transport.findById(id)
    .lean()
    .exec(generateQueryCallback('没有找到该运输记录。', callback))
}

const updateTransportByQuery = (query, update, callback) => {
  return Transport.findOneAndUpdate(query, update, { new: true })
    .lean()
    .exec(generateQueryCallback('没有找到该运输记录。', callback))
}

const updateTransportById = (id, update, callback) => {
  return updateTransportByQuery({ _id: id }, update, callback)
}

const deleteTransportById = (id, callback) => {
  return Transport.findByIdAndRemove(id)
    .lean()
    .exec(generateQueryCallback('运输记录不存在。', callback))
}

export {
  createTransport,
  getConditionTransports,
  getAllTransports,
  updateTransportByQuery,
  updateTransportById,
  deleteTransportById,
  getTransportById
}
