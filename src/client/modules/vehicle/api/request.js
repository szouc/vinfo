import axios from '@clientSettings/axiosInstance'
import { vehicle as URL } from '@server/exports/api'

const createVehicle = payload => {
  const config = {
    url: URL.VEHICLE_ROOT,
    method: 'post',
    data: payload
  }
  return axios(config)
}

const getAllVehicles = () => {
  const config = {
    url: URL.VEHICLE_ALL,
    method: 'get'
  }
  return axios(config)
}

const getVehiclesWithPg = (page, size, fromDate, toDate) => {
  const config = {
    url: URL.VEHICLE_ROOT,
    method: 'get',
    params: { page, size, from: fromDate, to: toDate }
  }
  return axios(config)
}

const deleteVehicleById = id => {
  const config = {
    url: URL.VEHICLE_ID.replace(/:id/, id),
    method: 'delete'
  }
  return axios(config)
}

const updateVehicleById = (id, update) => {
  const config = {
    url: URL.VEHICLE_ID.replace(/:id/, id),
    method: 'put',
    data: update
  }
  return axios(config)
}

const createVehicleFuel = (id, fuel) => {
  const config = {
    url: URL.VEHICLE_FUEL.replace(/:id/, id),
    method: 'post',
    data: fuel
  }
  return axios(config)
}

const createVehicleMaintain = (id, maintain) => {
  const config = {
    url: URL.VEHICLE_MAINTAIN.replace(/:id/, id),
    method: 'post',
    data: maintain
  }
  return axios(config)
}

export {
  createVehicle,
  getAllVehicles,
  getVehiclesWithPg,
  deleteVehicleById,
  updateVehicleById,
  createVehicleFuel,
  createVehicleMaintain
}
