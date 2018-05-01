import { Company } from './models'
import moment from 'moment'
import { Observable } from 'rxjs'
import * as Page from '../../utils/pagination'

const PROJECTION =
  'name addr abbr phone legalPerson taxNumber createdAt updatedAt active'

const createCompany = company => Observable.fromPromise(Company.create(company))

const getCompanyByQuery = query =>
  Observable.fromPromise(Company.findOne(query, PROJECTION).lean())

const getCompaniesByQuery = query =>
  Observable.fromPromise(Company.find(query, PROJECTION).lean())

const getAllCompanies = () => getCompaniesByQuery({ active: true })

const getCompaniesPagination = Page.producePagination(Company)

const getCompaniesData = Page.getModelSortedData(
  Company,
  PROJECTION,
  'createdAt'
)

const getCompaniesWithPg = (pageNumber, pageSize, values = {}) => {
  let active = { active: true }
  let fromDate = values.fromDate ? { $gte: moment(values.fromDate) } : {}
  let toDate = values.toDate ? { $lte: moment(values.toDate) } : {}
  let dateRange =
    values.fromDate || values.toDate
      ? { createdAt: { ...fromDate, ...toDate } }
      : {}
  let query = { ...active, ...dateRange }
  return Page.addPagination(
    getCompaniesPagination(pageNumber, pageSize, query),
    getCompaniesData(pageNumber, pageSize, query)
  )
}

const getCompanyById = id =>
  Observable.fromPromise(Company.findById(id, PROJECTION).lean())

const updateCompanyById = (id, update) =>
  Observable.fromPromise(
    Company.findByIdAndUpdate(id, { $set: update }, { new: true })
      .select(PROJECTION)
      .lean()
  )

const deleteCompanyById = id =>
  Observable.fromPromise(
    Company.findByIdAndUpdate(id, { active: false }, { new: true })
      .select(PROJECTION)
      .lean()
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
