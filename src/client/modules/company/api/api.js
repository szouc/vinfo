// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { companyNormalize, companyArrayNormalize } from '@clientSettings/schema'
import * as Request from './request'

async function createCompany(payload: Immut): ?Immut {
  const response = await Request.createCompany(payload)
  if (response.data.ok) {
    const data = response.data.result
    const company = companyNormalize(data)
    return fromJS(company)
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
  }
  throw new Error('Couldnt create a new company')
}

async function getAllCompanies(): ?Immut {
  const response = await Request.getAllCompanies()
  if (response.data.ok) {
    const data = response.data.result || {}
    const companies = companyArrayNormalize(data)
    return fromJS(companies)
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
  }
  throw new Error('Something wrong at getAllCompanies Process')
}

async function getCompaniesWithPg(payload: {
  pageNumber: Number,
  pageSize: Number,
  fromDate: String,
  toDate: String
}): ?Immut {
  const response = await Request.getCompaniesWithPg(
    payload.pageNumber,
    payload.pageSize,
    payload.formDate,
    payload.toDate
  )
  if (response.data.ok) {
    const { result, pagination } = response.data
    const companies = companyArrayNormalize(result)
    return fromJS({ company: companies, pagination })
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
  }
  throw new Error('Something wrong at getAllCompanies Process')
}

async function getCompanyById(id: string): ?Immut {
  const response = await Request.getCompanyById(id)
  if (response.data.ok) {
    const data = response.data.result || {}
    const company = companyNormalize(data)
    return fromJS(company)
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
  }
  throw new Error('Something wrong at getCompanyById Process')
}

async function updateCompanyById(id: string, payload: Immut): ?Immut {
  const response = await Request.updateCompanyById(id, payload)
  if (response.data.ok) {
    const data = response.data.result || {}
    const company = companyNormalize(data)
    return fromJS(company)
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
  }
  throw new Error('Something wrong at updateCompanyById Process')
}

async function deleteCompanyById(id: string) {
  const response = await Request.deleteCompanyById(id)
  if (response.data.ok) {
    return fromJS({ id })
  }
  if (!response.data.ok) {
    throw new Error(response.data.error)
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
