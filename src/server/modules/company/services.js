import { Company } from './models'
import moment from 'moment'
import { Observable } from 'rxjs'
import * as Page from '../../utils/pagination'

const createCompany = company => Observable.fromPromise(Company.create(company))

const getCompanyByQuery = query =>
  Observable.fromPromise(
    Company.findOne(query)
      .lean()
      .exec()
  )

const getCompaniesByQuery = query =>
  Observable.fromPromise(
    Company.find(query)
      .lean()
      .exec()
  )

const getAllCompanies = () => getCompaniesByQuery({ active: true })

const getCompaniesPagination = Page.producePagination(Company)

const getCompaniesData = Page.getModelSortedData(Company, 'created')

const getCompaniesWithPg = (pageNumber, pageSize, values = {}) => {
  let active = { active: true }
  let fromDate = values.fromDate ? { $gte: moment(values.fromDate) } : {}
  let toDate = values.toDate ? { $lte: moment(values.toDate) } : {}
  let dateRange =
    values.fromDate || values.toDate
      ? { created: { ...fromDate, ...toDate } }
      : {}
  let query = { ...active, ...dateRange }
  return Page.addPagination(
    getCompaniesPagination(pageNumber, pageSize, query),
    getCompaniesData(pageNumber, pageSize, query)
  )
}

const getCompanyById = id =>
  Observable.fromPromise(
    Company.findById(id)
      .lean()
      .exec()
  )

const updateCompanyById = (id, update) =>
  Observable.fromPromise(
    Company.findByIdAndUpdate(id, { $set: update }, { new: true })
      .lean()
      .exec()
  )

const deleteCompanyById = id =>
  Observable.fromPromise(
    Company.findByIdAndUpdate(id, { active: false }, { new: true })
      .lean()
      .exec()
  )

export {
  createCompany,
  getCompaniesWithPg,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompanyByQuery,
  getCompaniesByQuery
}
