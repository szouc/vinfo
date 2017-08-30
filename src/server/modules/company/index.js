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

import { permitManager, permitCaptain } from './permissions'

const companyRouter = express.Router()

companyRouter.route('/')
  .get(getAllCompanies)
  .post(permitManager, createCompany)

companyRouter.route(COMPANY_QUERY_ROUTE)
  .get(permitCaptain, getCompanyByQuery)

// Dynamic route should put the last position
companyRouter.route(COMPANY_ID_ROUTE)
  .get(permitCaptain, getCompanyById)
  .put(permitManager, updateCompanyById)
  .delete(permitManager, deleteCompanyById)

export default companyRouter
