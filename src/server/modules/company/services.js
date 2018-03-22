import { Company } from './models'
import moment from 'moment'
import { Observable } from 'rxjs'
import * as Page from '../../utils/pagination'

const PROJECTION = 'name addr phone legal_person tax_number created active'

const createCompany = company =>
  Observable.fromPromise(Company.create(company))

const getCompanyByQuery = query =>
  Observable.fromPromise(
    Company.findOne(query, PROJECTION)
      .lean()
      .exec()
  )

const getCompaniesByQuery = query =>
  Observable.fromPromise(
    Company.find(query, PROJECTION)
      .lean()
      .exec()
  )

const getAllCompanies = () => getCompaniesByQuery({ active: true })

const getCompaniesPagination = Page.producePagination(Company)

const getCompaniesData = Page.getModelSortedData(Company, PROJECTION, 'created')

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
    Company.findById(id, PROJECTION)
      .lean()
      .exec()
  )

const updateCompanyById = (id, update) =>
  Observable.fromPromise(
    Company.findByIdAndUpdate(id, { $set: update }, { new: true })
      .select(PROJECTION)
      .lean()
      .exec()
  )

const deleteCompanyById = id =>
  Observable.fromPromise(
    Company.findByIdAndUpdate(id, { active: false }, { new: true })
      .select(PROJECTION)
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
