import addPrefix from '@clientUtils/addPrefix'

export const MODULE_NAME = 'VEHICLE'
const addVehiclePrefix = addPrefix(MODULE_NAME)

/**
 * Generating async request suffix
 */
export const SET_LOADING = addVehiclePrefix('SET_LOADING')
export const SHOW_DETAIL = addVehiclePrefix('SHOW_DETAIL')
export const SET_PAGINATION = addVehiclePrefix('SET_PAGINATION')
export const FETCH_LIST_REQUEST = addVehiclePrefix('FETCH_LIST_REQUEST')
export const FETCH_LIST_SUCCESS = addVehiclePrefix('FETCH_LIST_SUCCESS')
export const FETCH_ALL_REQUEST = addVehiclePrefix('FETCH_ALL_REQUEST')
export const FETCH_ALL_SUCCESS = addVehiclePrefix('FETCH_ALL_SUCCESS')
export const FETCH_REQUEST = addVehiclePrefix('FETCH_REQUEST')
export const FETCH_SUCCESS = addVehiclePrefix('FETCH_SUCCESS')
export const UPDATE_REQUEST = addVehiclePrefix('UPDATE_REQUEST')
export const UPDATE_SUCCESS = addVehiclePrefix('UPDATE_SUCCESS')
export const CREATE_REQUEST = addVehiclePrefix('CREATE_REQUEST')
export const CREATE_SUCCESS = addVehiclePrefix('CREATE_SUCCESS')
export const DELETE_REQUEST = addVehiclePrefix('DELETE_REQUEST')
export const DELETE_SUCCESS = addVehiclePrefix('DELETE_SUCCESS')
export const CREATE_FUEL_REQUEST = addVehiclePrefix('CREATE_FUEL_REQUEST')
export const CREATE_FUEL_SUCCESS = addVehiclePrefix('CREATE_FUEL_SUCCESS')
export const DELETE_FUEL_REQUEST = addVehiclePrefix('DELETE_FUEL_REQUEST')
export const DELETE_FUEL_SUCCESS = addVehiclePrefix('DELETE_FUEL_SUCCESS')
export const CREATE_MAINTAIN_REQUEST = addVehiclePrefix(
  'CREATE_MAINTAIN_REQUEST'
)
export const CREATE_MAINTAIN_SUCCESS = addVehiclePrefix(
  'CREATE_MAINTAIN_SUCCESS'
)
export const DELETE_MAINTAIN_REQUEST = addVehiclePrefix(
  'DELETE_MAINTAIN_REQUEST'
)
export const DELETE_MAINTAIN_SUCCESS = addVehiclePrefix(
  'DELETE_MAINTAIN_SUCCESS'
)
