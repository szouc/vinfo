// import { MODULE_NAME } from './index'

const defineModule = module => (...constant) => {
  const SEPARATOR = '_'
  return [module, ...constant].join(SEPARATOR)
}

export const MODULE_NAME = 'VEHICLE'
const defineConstant = defineModule(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = defineConstant('SET_LOADING')
export const SHOW_DETAIL_VEHICLE = defineConstant('SHOW_DETAIL_VEHICLE')

export const FETCH_VEHICLE_LIST_REQUEST = defineConstant('FETCH_VEHICLE_LIST_REQUEST')
export const FETCH_VEHICLE_LIST_SUCCESS = defineConstant('FETCH_VEHICLE_LIST_SUCCESS')
export const FETCH_VEHICLE_ALL_REQUEST = defineConstant('FETCH_VEHICLE_ALL_REQUEST')
export const FETCH_VEHICLE_ALL_SUCCESS = defineConstant('FETCH_VEHICLE_ALL_SUCCESS')
export const FETCH_VEHICLE_REQUEST = defineConstant('FETCH_VEHICLE_REQUEST')
export const FETCH_VEHICLE_SUCCESS = defineConstant('FETCH_VEHICLE_SUCCESS')
export const UPDATE_VEHICLE_REQUEST = defineConstant('UPDATE_VEHICLE_REQUEST')
export const UPDATE_VEHICLE_SUCCESS = defineConstant('UPDATE_VEHICLE_SUCCESS')
export const CREATE_VEHICLE_REQUEST = defineConstant('CREATE_VEHICLE_REQUEST')
export const CREATE_VEHICLE_SUCCESS = defineConstant('CREATE_VEHICLE_SUCCESS')
export const DELETE_VEHICLE_REQUEST = defineConstant('DELETE_VEHICLE_REQUEST')
export const DELETE_VEHICLE_SUCCESS = defineConstant('DELETE_VEHICLE_SUCCESS')
export const CREATE_FUEL_REQUEST = defineConstant('CREATE_FUEL_REQUEST')
export const CREATE_FUEL_SUCCESS = defineConstant('CREATE_FUEL_SUCCESS')
export const DELETE_FUEL_REQUEST = defineConstant('DELETE_FUEL_REQUEST')
export const DELETE_FUEL_SUCCESS = defineConstant('DELETE_FUEL_SUCCESS')
export const CREATE_MAINTAIN_REQUEST = defineConstant('CREATE_MAINTAIN_REQUEST')
export const CREATE_MAINTAIN_SUCCESS = defineConstant('CREATE_MAINTAIN_SUCCESS')
export const DELETE_MAINTAIN_REQUEST = defineConstant('DELETE_MAINTAIN_REQUEST')
export const DELETE_MAINTAIN_SUCCESS = defineConstant('DELETE_MAINTAIN_SUCCESS')
