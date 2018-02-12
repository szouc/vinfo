import { Company } from './models'
import {
  generateQueryCallback,
  returnPromiseOrExec,
  addPagination
} from '../../utils/dbService'

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

const getCompanyByQuery = (query, callback) => {
  const dbQuery = Company.findOne(query)
  return returnPromiseOrExec(dbQuery, '没有该公司。', callback)
}

const getCompaniesByQuery = (query, callback) => {
  const dbQuery = Company.find(query)
  return returnPromiseOrExec(dbQuery, '没有找到符合条件的公司。', callback)
}

const getAllCompanies = callback => {
  return getCompaniesByQuery({ active: true }, callback)
}

const getCompaniesWithPagination = () =>
  addPagination(getAllCompanies, null, { name: 1 })

const getCompanyById = (id, callback) => {
  const dbQuery = Company.findById(id)
  return returnPromiseOrExec(dbQuery, '没有找到该公司。', callback)
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

export {
  createCompany,
  getCompaniesWithPagination,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompanyByQuery,
  getCompaniesByQuery
}
