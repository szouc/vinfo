import express from 'express'

import * as Route from './routes'

import * as Controller from './controllers'

import { permitManager } from './permissions'

const companyRouter = express.Router()

companyRouter
  .route('/')
  .all(permitManager)
  .get(Controller.getCompaniesWithPg)
  .post(Controller.createCompany)

companyRouter
  .route(Route.COMPANY_ALL)
  .all(permitManager)
  .get(Controller.getAllCompanies)

companyRouter
  .route(Route.COMPANY_QUERY)
  .get(permitManager, Controller.getCompaniesByQuery)

// Dynamic route should put the last position
companyRouter
  .route(Route.COMPANY_ID)
  .all(permitManager)
  .get(Controller.getCompanyById)
  .put(Controller.updateCompanyById)
  .delete(Controller.deleteCompanyById)

export default companyRouter
