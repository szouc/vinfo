// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { companyNormalize, companyArrayNormalize } from '@clientSettings/schema'
import * as Request from './request'

const STATUS_OK = 200

async function createCompany(payload: Immut): ?Immut {
  const response = await Request.createCompany(payload)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const company = companyNormalize(data)
    return fromJS(company)
  }
  throw new Error('Couldnt create a new company')
}

async function getAllCompanies(): ?Immut {
  const response = await Request.getAllCompanies()
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const companies = companyArrayNormalize(data)
    return fromJS(companies)
  }
  throw new Error('Something wrong at getAllCompanies Process')
}

async function getCompaniesWithPg(page, size, formDate, toDate): ?Immut {
  const response = await Request.getCompaniesWithPg(
    page,
    size,
    formDate,
    toDate
  )
  if (response.status === STATUS_OK) {
    const { result, pagination } = response.data
    const companies = companyArrayNormalize(result)
    return fromJS({ company: companies, pagination })
  }
  throw new Error('Something wrong at getAllCompanies Process')
}

async function getCompanyById(id: string): ?Immut {
  const response = await Request.getCompanyById(id)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const company = companyNormalize(data)
    return fromJS(company)
  }
  throw new Error('Something wrong at getCompanyById Process')
}

async function updateCompanyById(id: string, payload: Immut): ?Immut {
  const response = await Request.updateCompanyById(id, payload)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const company = companyNormalize(data)
    return fromJS(company)
  }
  throw new Error('Something wrong at updateCompanyById Process')
}

async function deleteCompanyById(id: string) {
  const response = await Request.deleteCompanyById(id)
  if (response.status === STATUS_OK) {
    const data = response.data.result
    const company = companyNormalize(data)
    return fromJS(company)
  }
  throw new Error('Something wrong at deleteCompanyById Process')
}

export {
  createCompany,
  getAllCompanies,
  getCompaniesWithPg,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById
}
