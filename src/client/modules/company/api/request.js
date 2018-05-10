import axios from '@clientSettings/axiosInstance'
import { company as URL } from '@server/exports/api'

const createCompany = payload => {
  const config = {
    url: URL.COMPANY_ROOT,
    method: 'post',
    data: payload
  }
  return axios(config)
}

const getAllCompanies = () => {
  const config = {
    url: URL.COMPANY_ALL,
    method: 'get'
  }
  return axios(config)
}

const getCompaniesWithPg = payload => {
  const config = {
    url: URL.COMPANY_ROOT,
    method: 'get',
    params: payload
  }
  return axios(config)
}

const getCompanyById = id => {
  const config = {
    url: URL.COMPANY_ID.replace(/:id/, id),
    method: 'get'
  }
  return axios(config)
}

const updateCompanyById = (id, update) => {
  const config = {
    url: URL.COMPANY_ID.replace(/:id/, id),
    method: 'put',
    data: update
  }
  return axios(config)
}

const deleteCompanyById = id => {
  const config = {
    url: URL.COMPANY_ID.replace(/:id/, id),
    method: 'delete'
  }
  return axios(config)
}

export {
  createCompany,
  getAllCompanies,
  getCompaniesWithPg,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById
}
