// @flow

import { createAction } from 'redux-actions'
import {
  FETCH_VEHICLE_REQUEST,
  FETCH_VEHICLE_LIST_REQUEST,
  UPDATE_VEHICLE_REQUEST,
  CREATE_VEHICLE_REQUEST,
  DELETE_VEHICLE_REQUEST,
  CREATE_FUEL_REQUEST,
  DELETE_FUEL_REQUEST,
  CREATE_MAINTAIN_REQUEST,
  DELETE_MAINTAIN_REQUEST
} from './actionTypes'

export const fetchProductRequest = createAction(FETCH_VEHICLE_REQUEST)
export const fetchProductListRequest = createAction(FETCH_VEHICLE_LIST_REQUEST)
export const updateProductRequest = createAction(UPDATE_VEHICLE_REQUEST)
export const createProductRequest = createAction(CREATE_VEHICLE_REQUEST)
export const deleteProductRequest = createAction(DELETE_VEHICLE_REQUEST)
export const createFuelRequest = createAction(CREATE_FUEL_REQUEST)
export const deleteFuelRequest = createAction(DELETE_FUEL_REQUEST)
export const createMaintainRequest = createAction(CREATE_MAINTAIN_REQUEST)
export const deleteMaintainRequest = createAction(DELETE_MAINTAIN_REQUEST)
