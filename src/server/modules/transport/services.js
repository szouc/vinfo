import { Transport } from './models'
import { ASSIGN, ACCEPT } from './constants'
import {
  generateQueryCallback,
  returnPromiseOrExec,
  addPagination
} from '../../utils/dbService'

const createTransport = (transport, callback) => {
  if (typeof callback === 'function') {
    return Transport.create(
      transport,
      generateQueryCallback('无法创建运输记录。', callback)
    )
  }
  return Transport.create(transport)
}

const getTransportByQuery = (query, callback) => {
  const dbQuery = Transport.findOne(query)
  return returnPromiseOrExec(dbQuery, '没有找到该运输记录。', callback)
}

const getTransportsByQuery = (query, callback) => {
  const dbQuery = Transport.find(query)
  return returnPromiseOrExec(dbQuery, '没有找到该运输记录。', callback)
}

const getAllTransports = callback => {
  return getTransportsByQuery({ active: true }, callback)
}

const getTransportsWithPagination = () =>
  addPagination(getAllTransports, null, { created: -1 })

const getTransportsByUsername = (username, callback) =>
  getTransportsByQuery({ 'principal.username': username }, callback)

const getUserTransWithPagination = username =>
  addPagination(getTransportsByUsername, username, { created: -1 })

const getTransportById = (id, callback) => {
  const dbQuery = Transport.findById(id)
  return returnPromiseOrExec(dbQuery, '没有找到该运输记录。', callback)
}

const updateTransportByQuery = (query, update, callback) => {
  const dbQuery = Transport.findOneAndUpdate(query, update, { new: true })
  return returnPromiseOrExec(dbQuery, '没有找到该运输记录。', callback)
}

const updateTransportById = (id, update, callback) => {
  return updateTransportByQuery({ _id: id }, update, callback)
}

const updateTransportStatus = (username, transportId, updateStatus, callback) => {
  return updateTransportByQuery(
    {
      'principal.username': username,
      _id: transportId,
      captain_status: { $in: [ASSIGN, ACCEPT] }
    },
    { captain_status: updateStatus },
    callback
  )
}

const deleteTransportById = (id, callback) => {
  const dbQuery = Transport.findByIdAndRemove(id)
  return returnPromiseOrExec(dbQuery, '运输记录不存在。', callback)
}

export {
  getTransportByQuery,
  getTransportsByQuery,
  createTransport,
  getTransportsWithPagination,
  getUserTransWithPagination,
  getTransportsByUsername,
  getAllTransports,
  updateTransportByQuery,
  updateTransportById,
  updateTransportStatus,
  deleteTransportById,
  getTransportById
}
