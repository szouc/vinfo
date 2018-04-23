import moment from 'moment'
import { Transport } from './models'
import { Observable } from 'rxjs'
import * as Page from '../../utils/pagination'
import { ASSIGN, ACCEPT, SUBMIT } from './constants'

const PROJECTION =
  'num assigner vehicle principal secondary from to product captain_status captain_info price accountant_status accountant accountant_info active created'

const createTransport = transport =>
  Observable.fromPromise(Transport.create(transport))

const getTransportByQuery = query =>
  Observable.fromPromise(Transport.findOne(query, PROJECTION))

const getTransportsByQuery = query =>
  Observable.fromPromise(Transport.find(query, PROJECTION))

const getAllTransports = () => getTransportsByQuery({ active: true })

const getTransportsPagination = Page.producePagination(Transport)

const getTransportsData = Page.getModelSortedData(
  Transport,
  PROJECTION,
  '-created'
)

const getTransportsWithPg = (pageNumber, pageSize, values = {}) => {
  let activeQuery = { active: true }
  let driverQuery = values.driver ? { 'principal.username': values.driver } : {}
  let captainQuery = values.captain
    ? { 'assigner.username': values.captain }
    : {}
  let captainStatusQuery = values.captainStatus
    ? { captain_status: values.captainStatus }
    : {}
  let accountantStatusQuery = values.accountantStatus
    ? { accountant_status: values.accountantStatus }
    : {}
  let accountantQuery = values.accountant
    ? { 'accountant.username': values.accountant }
    : {}
  let fromDateQuery = values.fromDate ? { $gte: moment(values.fromDate) } : {}
  let toDateQuery = values.toDate ? { $lte: moment(values.toDate) } : {}
  let dateRangeQuery =
    values.fromDate || values.toDate
      ? { created: { ...fromDateQuery, ...toDateQuery } }
      : {}
  let query = {
    ...activeQuery,
    ...driverQuery,
    ...captainStatusQuery,
    ...accountantStatusQuery,
    ...captainQuery,
    ...accountantQuery,
    ...dateRangeQuery
  }
  return Page.addPagination(
    getTransportsPagination(pageNumber, pageSize, query),
    getTransportsData(pageNumber, pageSize, query)
  )
}

// const getDriverTransportsWithPg = (pageNumber, pageSize, ...rest) => {
//   let [username] = rest
//   let query = { 'principal.username': username, active: true }
//   return Page.addPagination(
//     getTransportsPagination(pageNumber, pageSize, query),
//     getTransportsData(pageNumber, pageSize, query)
//   )
// }

// const getCaptainTransportsWithPg = (pageNumber, pageSize, ...rest) => {
//   let [username] = rest
//   let query = { 'assigner.username': username, active: true }
//   return Page.addPagination(
//     getTransportsPagination(pageNumber, pageSize, query),
//     getTransportsData(pageNumber, pageSize, query)
//   )
// }

const getTransportById = id =>
  Observable.fromPromise(Transport.findById(id, PROJECTION))

const updateTransportByQuery = (query, update) =>
  Observable.fromPromise(
    Transport.findOneAndUpdate(query, update, { new: true }).select(PROJECTION)
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

const updateTransportByDriver = (username, transportId, update) => {
  let query = {
    _id: transportId,
    'principal.username': username
  }
  return updateTransportByQuery(query, update)
}

const updateStatusByDriver = (username, transportId, updateStatus) => {
  let query = {
    _id: transportId,
    'principal.username': username,
    captain_status: { $in: [ASSIGN, ACCEPT] }
  }
  let update = { $set: { captain_status: updateStatus } }
  return updateTransportByQuery(query, update)
}

const deleteTransportById = id =>
  Observable.fromPromise(Transport.findByIdAndRemove(id).select(PROJECTION))

const checkTransportById = (username, transportId, updateStatus) => {
  let query = {
    'assigner.username': username,
    _id: transportId,
    captain_status: { $in: [ASSIGN, ACCEPT, SUBMIT] }
  }
  let update = {
    $set: { captain_status: updateStatus }
  }
  return updateTransportByQuery(query, update)
}

const checkAccountById = (username, transportId, updateStatus) => {
  let query = {
    'accountant.username': username,
    _id: transportId,
    accountant_status: { $in: [SUBMIT] }
  }
  let update = {
    $set: { accountant_status: updateStatus }
  }
  return updateTransportByQuery(query, update)
}

export {
  getTransportByQuery,
  getTransportsByQuery,
  createTransport,
  getTransportsWithPg,
  // getDriverTransportsWithPg,
  // getCaptainTransportsWithPg,
  getAllTransports,
  updateTransportByQuery,
  updateTransportById,
  updateTransportStatus,
  updateTransportByDriver,
  updateStatusByDriver,
  deleteTransportById,
  checkTransportById,
  checkAccountById,
  getTransportById
}
