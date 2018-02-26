import { Transport } from './models'
import { Observable } from 'rxjs'
import * as Page from '../../utils/pagination'
import { ASSIGN, ACCEPT } from './constants'

const createTransport = transport =>
  Observable.fromPromise(Transport.create(transport))

const getTransportByQuery = query =>
  Observable.fromPromise(Transport.findOne(query))

const getTransportsByQuery = query =>
  Observable.fromPromise(Transport.find(query))

const getAllTransports = () => getTransportsByQuery({ active: true })

const getTransportsPagination = Page.producePagination(Transport)

const getTransportsData = Page.getModelSortedData(Transport, '-created')

const getTransportsWithPg = (pageNumber, pageSize, ...rest) => {
  let query = { active: true }
  return Page.addPagination(
    getTransportsPagination(pageNumber, pageSize, query),
    getTransportsData(pageNumber, pageSize, query)
  )
}

const getUserTransportsWithPg = (pageNumber, pageSize, ...rest) => {
  let [username] = rest
  let query = { 'principal.username': username, active: true }
  return Page.addPagination(
    getTransportsPagination(pageNumber, pageSize, query),
    getTransportsData(pageNumber, pageSize, query)
  )
}

const getTransportById = id => Observable.fromPromise(Transport.findById(id))

const updateTransportByQuery = (query, update) =>
  Observable.fromPromise(
    Transport.findOneAndUpdate(query, update, { new: true })
  )

const updateTransportById = (id, update) =>
  updateTransportByQuery({ _id: id }, update)

const updateTransportStatus = (transportId, updateStatus) => {
  let query = {
    _id: transportId,
    captain_status: { $in: [ASSIGN, ACCEPT] }
  }
  let update = { captain_status: updateStatus }
  return updateTransportByQuery(query, update)
}

const updateStatusByDriver = (username, transportId, updateStatus) => {
  let query = {
    _id: transportId,
    'principal.username': username,
    captain_status: { $in: [ASSIGN, ACCEPT] }
  }
  let update = { captain_status: updateStatus }
  return updateTransportByQuery(query, update)
}

const deleteTransportById = id =>
  Observable.fromPromise(Transport.findByIdAndRemove(id))

export {
  getTransportByQuery,
  getTransportsByQuery,
  createTransport,
  getTransportsWithPg,
  getUserTransportsWithPg,
  getAllTransports,
  updateTransportByQuery,
  updateTransportById,
  updateTransportStatus,
  updateStatusByDriver,
  deleteTransportById,
  getTransportById
}
