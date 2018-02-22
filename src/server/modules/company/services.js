import { Company } from './models'
import {
  generateQueryCallback,
  returnPromiseOrExec,
  addPagination,
  addPagination1
} from '../../utils/dbService'
import { Observable } from 'rxjs'

const createCompany = (company, callback) => {
  // 'Create' cmd returns a Promise instead of the Query.
  if (typeof callback === 'function') {
    return Company.create(
      company,
      generateQueryCallback('公司没有成功创建。', callback)
    )
  }
  return Company.create(company)
}

const createCompany1 = company => {
  return Observable.fromPromise(Company.create(company))
}

const getCompanyByQuery = (query, callback) => {
  const dbQuery = Company.findOne(query)
  return returnPromiseOrExec(dbQuery, '没有该公司。', callback)
}

const getCompanyByQuery1 = query =>
  Observable.fromPromise(
    Company.findOne(query)
      .lean()
      .exec()
  )

const getCompaniesByQuery = (query, callback) => {
  const dbQuery = Company.find(query)
  return returnPromiseOrExec(dbQuery, '没有找到符合条件的公司。', callback)
}

const getCompaniesByQuery1 = query =>
  Observable.fromPromise(
    Company.find(query)
      .lean()
      .exec()
  )

const getAllCompanies = callback => {
  return getCompaniesByQuery({ active: true }, callback)
}

const getAllCompanies1 = () => getCompaniesByQuery1({ active: true })

const getCompaniesWithPagination = () =>
  addPagination(getAllCompanies, null, { name: 1 })

const getCompaniesCount = () =>
  Observable.fromPromise(Company.find({ active: true }))

const getCompaniesByPage = (pageNumber, pageSize) =>
  Observable.fromPromise(
    Company.find({ active: true })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ name: 1 })
      .lean()
      .exec()
  )
const getCompaniesWithPagination1 = addPagination1(
  getCompaniesCount,
  getCompaniesByPage
)

const getCompanyById = (id, callback) => {
  const dbQuery = Company.findById(id)
  return returnPromiseOrExec(dbQuery, '没有找到该公司。', callback)
}

const getCompanyById1 = id =>
  Observable.fromPromise(
    Company.findById(id)
      .lean()
      .exec()
  )

const updateCompanyById1 = (id, update) => {
  return Observable.fromPromise(
    Company.findByIdAndUpdate(id, { $set: update }, { new: true })
      .lean()
      .exec()
  )
}

const updateCompanyById = (id, update, callback) => {
  const dbQuery = Company.findByIdAndUpdate(id, { $set: update }, { new: true })
  return returnPromiseOrExec(dbQuery, '没有找到该公司。', callback)
}

const deleteCompanyById = (id, callback) => {
  const dbQuery = Company.findByIdAndUpdate(
    id,
    { active: false },
    { new: true }
  )
  return returnPromiseOrExec(dbQuery, '没有找到该公司。', callback)
}

const deleteCompanyById1 = id =>
  Observable.fromPromise(
    Company.findByIdAndUpdate(id, { active: false }, { new: true })
  )

export {
  createCompany,
  createCompany1,
  getCompaniesWithPagination,
  getCompaniesWithPagination1,
  getAllCompanies,
  getAllCompanies1,
  getCompanyById,
  getCompanyById1,
  updateCompanyById,
  updateCompanyById1,
  deleteCompanyById,
  deleteCompanyById1,
  getCompanyByQuery,
  getCompanyByQuery1,
  getCompaniesByQuery,
  getCompaniesByQuery1
}
