import express from 'express'

import { COMPANY_ID_ROUTE, COMPANY_QUERY_ROUTE } from './routes'

import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompanyByQuery
} from './controllers'

import { permitManager } from './permissions'

const companyRouter = express.Router()

companyRouter.route('/')
  .all(permitManager)
  .get(getAllCompanies)
  .post(createCompany)

companyRouter.route(COMPANY_QUERY_ROUTE)
  .get(permitManager, getCompanyByQuery)

// Dynamic route should put the last position
companyRouter.route(COMPANY_ID_ROUTE)
  .all(permitManager)
  .get(getCompanyById)
  .put(updateCompanyById)
  .delete(deleteCompanyById)

export default companyRouter
