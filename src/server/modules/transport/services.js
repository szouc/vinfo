import moment from 'moment'
import { Transport } from './models'
import { Observable } from 'rxjs'
import * as Page from '../../utils/pagination'
import { ASSIGN, ACCEPT, SUBMIT } from './constants'

const PROJECTION =
  'num assigner assignerName vehicle plate engine principal principalName secondary secondaryName fromCompany fromName fromAddr fromWeight fromDate toCompany toName toAddr toWeight toDate product productName productSpecs captainStatus captainInfo price accountantStatus accountant accountantName accountantInfo active createdAt'

const createTransport = transport =>
  Observable.fromPromise(Transport.create(transport))

const getTransportByQuery = query =>
  Observable.fromPromise(Transport.findOne(query, PROJECTION))

const getTransportsByQuery = query =>
  Observable.fromPromise(Transport.find(query, PROJECTION))

const getAllTransports = () => getTransportsByQuery({ active: true })

const getTransportsWithPg = (
  pageNumber,
  pageSize,
  values = {},
  projection = PROJECTION
) => {
  const getTransportsPagination = Page.producePagination(Transport)
  const getTransportsData = Page.getModelSortedData(
    Transport,
    projection,
    '-createdAt'
  )
  let activeQuery = { active: true }
  let driverQuery = values.driver ? { principal: values.driver } : {}
  let captainStatusQuery = values.captainStatus
    ? { captainStatus: values.captainStatus }
    : {}
  let accountantStatusQuery = values.accountantStatus
    ? { accountantStatus: values.accountantStatus }
    : {}
  let captainQuery = values.captain ? { assigner: values.captain } : {}
  let accountantQuery = values.accountant
    ? { accountant: values.accountant }
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
    captainStatus: { $in: [ASSIGN, ACCEPT, SUBMIT] }
  }
  let update = { captainStatus: updateStatus }
  return updateTransportByQuery(query, update)
}

const updateTransportByDriver = (username, transportId, update) => {
  let query = {
    _id: transportId,
    'principal': username
  }
  return updateTransportByQuery(query, update)
}

const updateStatusByDriver = (username, transportId, updateStatus) => {
  let query = {
    _id: transportId,
    'principal': username,
    captainStatus: { $in: [ASSIGN, ACCEPT] }
  }
  let update = { $set: { captainStatus: updateStatus } }
  return updateTransportByQuery(query, update)
}

const deleteTransportById = id =>
  Observable.fromPromise(Transport.findByIdAndRemove(id).select(PROJECTION))

const checkTransportById = (username, transportId, updateStatus) => {
  let query = {
    'assigner.username': username,
    _id: transportId,
    captainStatus: { $in: [ASSIGN, ACCEPT, SUBMIT] }
  }
  let update = {
    $set: { captainStatus: updateStatus }
  }
  return updateTransportByQuery(query, update)
}

const checkAccountById = (username, transportId, updateStatus) => {
  let query = {
    'accountant.username': username,
    _id: transportId,
    accountantStatus: { $in: [SUBMIT] }
  }
  let update = {
    $set: { accountantStatus: updateStatus }
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
