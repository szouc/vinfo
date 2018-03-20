import axios from '@clientSettings/axiosInstance'
import { transport as URL } from '@server/exports/api'

const createTransport = payload => {
  const config = {
    url: URL.TRANSPORT_ROOT,
    method: 'post',
    data: payload
  }
  return axios(config)
}

const getAllTransports = () => {
  const config = {
    url: URL.TRANSPORT_ALL,
    method: 'get'
  }
  return axios(config)
}

const getTransportsWithPg = (page, size, fromDate, toDate) => {
  const config = {
    url: URL.TRANSPORT_ROOT,
    method: 'get',
    params: { page, size, from: fromDate, to: toDate }
  }
  return axios(config)
}
export { createTransport, getAllTransports, getTransportsWithPg }
