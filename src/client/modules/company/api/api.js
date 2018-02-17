// @flow

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'
import { companyNormalize, companyArrayNormalize } from '../schema'

import {
  COMPANY_ID,
  // COMPANY_QUERY,
  COMPANY_ROOT
} from './apiRoutes'

import fetch from '@clientUtils/fetch'

const STATUS_OK = 200

async function createCompany(payload: Immut): ?Immut {
  const options = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(COMPANY_ROOT, options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const company = companyNormalize(data)
    return fromJS(company)
  }
  throw new Error('Couldnt create a new company')
}

async function getAllCompanies(): ?Immut {
  const options = {
    method: 'get'
  }
  const response = await fetch(COMPANY_ROOT, options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const companies = companyArrayNormalize(data.result)
    return fromJS(companies)
  }
  throw new Error('Something wrong at getAllCompanies Process')
}

async function getCompanyById(id: string): ?Immut {
  const options = {
    method: 'get'
  }
  const response = await fetch(COMPANY_ID.replace(/:id/, id), options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const company = companyNormalize(data)
    return fromJS(company)
  }
  throw new Error('Something wrong at getCompanyById Process')
}

async function updateCompanyById(id: string, payload: Immut): ?Immut {
  const options = {
    method: 'put',
    body: JSON.stringify(payload)
  }
  const response = await fetch(COMPANY_ID.replace(/:id/, id), options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const company = companyNormalize(data)
    return fromJS(company)
  }
  throw new Error('Something wrong at updateCompanyById Process')
}

async function deleteCompanyById(id: string) {
  const options = {
    method: 'delete'
  }
  const response = await fetch(COMPANY_ID.replace(/:id/, id), options)
  if (response.status === STATUS_OK) {
    const data = await response.json()
    const company = companyNormalize(data.result)
    return fromJS(company)
  }
  throw new Error('Something wrong at deleteCompanyById Process')
}

export {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById
}
