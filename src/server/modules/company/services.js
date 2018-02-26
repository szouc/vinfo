import { Company } from './models'
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

const getCompaniesData = Page.getModelSortedData(Company, 'name')

const getCompaniesWithPagination = (pageNumber, pageSize, ...rest) => {
  let query = { active: true }
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
  getCompaniesWithPagination,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompanyByQuery,
  getCompaniesByQuery
}
