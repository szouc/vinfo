// @flow

import * as Type from './actionTypes'

import {
  COMPANY_STATE_KEY,
  FUEL_STATE_KEY,
  MAINTAIN_STATE_KEY,
  PRICE_HISTORY_STATE_KEY,
  PRODUCT_STATE_KEY,
  TRANSPORT_STATE_KEY,
  USER_STATE_KEY,
  VEHICLE_STATE_KEY
} from '@clientSettings/schema'

import type { fromJS as Immut } from 'immutable'
import { fromJS } from 'immutable'

const InitialState = fromJS({
  [USER_STATE_KEY]: {},
  [FUEL_STATE_KEY]: {},
  [MAINTAIN_STATE_KEY]: {},
  [VEHICLE_STATE_KEY]: {},
  [COMPANY_STATE_KEY]: {},
  [PRODUCT_STATE_KEY]: {},
  [PRICE_HISTORY_STATE_KEY]: {},
  [TRANSPORT_STATE_KEY]: {}
})

const entityReducer = (
  state: Immut = InitialState,
  action: { type: string, payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case Type.ADD_COMPANY_ENTITY:
      return state.mergeIn([COMPANY_STATE_KEY], payload.get(COMPANY_STATE_KEY))
    case Type.ADD_USER_ENTITY:
      return state.mergeIn([USER_STATE_KEY], payload.get(USER_STATE_KEY))
    case Type.ADD_FUEL_ENTITY:
      return state
        .mergeIn([FUEL_STATE_KEY], payload.get(FUEL_STATE_KEY))
    case Type.ADD_MAINTAIN_ENTITY:
      return state
        .mergeIn([MAINTAIN_STATE_KEY], payload.get(MAINTAIN_STATE_KEY))
    case Type.ADD_PRICE_HISTORY_ENTITY:
      return state.mergeIn(
        [PRICE_HISTORY_STATE_KEY],
        payload.get(PRICE_HISTORY_STATE_KEY)
      )
    case Type.ADD_PRODUCT_ENTITY:
      return state
        .mergeIn([PRODUCT_STATE_KEY], payload.get(PRODUCT_STATE_KEY))
        .mergeIn(
          [PRICE_HISTORY_STATE_KEY],
          payload.get(PRICE_HISTORY_STATE_KEY)
        )
    case Type.ADD_VEHICLE_ENTITY:
      return state
        .mergeIn([VEHICLE_STATE_KEY], payload.get(VEHICLE_STATE_KEY))
        .mergeIn([FUEL_STATE_KEY], payload.get(FUEL_STATE_KEY))
        .mergeIn([MAINTAIN_STATE_KEY], payload.get(MAINTAIN_STATE_KEY))
    case Type.ADD_TRANSPORT_ENTITY:
      return state
        .mergeIn([TRANSPORT_STATE_KEY], payload.get(TRANSPORT_STATE_KEY))
    case Type.DELETE_ENTITY:
      return state.deleteIn([payload.stateKey, payload.id])
    default:
      return state
  }
}

export default entityReducer
