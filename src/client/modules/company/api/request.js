import axios from '@clientSettings/axiosInstance'
import { company } from '@server/exports/api'

const createCompany = payload => {
  const config = {
    url: company.COMPANY_ROOT,
    method: 'post',
    data: payload
  }
  return axios(config)
}

const getAllCompanies = () => {
  const config = {
    url: company.COMPANY_ALL,
    method: 'get'
  }
  return axios(config)
}

const getCompaniesWithPg = (page, size, fromDate, toDate) => {
  const config = {
    url: company.COMPANY_ROOT,
    method: 'get',
    params: { page, size, from: fromDate, to: toDate }
  }
  return axios(config)
}

export { createCompany, getAllCompanies, getCompaniesWithPg }
