// @flow

import { createAction } from 'redux-actions'
import * as Type from './actionTypes'

export const fetchVehicleRequest = createAction(Type.FETCH_REQUEST)
export const fetchVehicleAllRequest = createAction(Type.FETCH_ALL_REQUEST)
export const fetchVehicleListRequest = createAction(Type.FETCH_LIST_REQUEST)
export const updateVehicleRequest = createAction(Type.UPDATE_REQUEST)
export const createVehicleRequest = createAction(Type.CREATE_REQUEST)
export const deleteVehicleRequest = createAction(Type.DELETE_REQUEST)
export const createFuelRequest = createAction(Type.CREATE_FUEL_REQUEST)
export const deleteFuelRequest = createAction(Type.DELETE_FUEL_REQUEST)
export const createMaintainRequest = createAction(Type.CREATE_MAINTAIN_REQUEST)
export const deleteMaintainRequest = createAction(Type.DELETE_MAINTAIN_REQUEST)
