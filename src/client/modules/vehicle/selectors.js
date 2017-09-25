// @flow

import { denormalizeVehicle, denormalizeVehicleArray } from './schema'
import createImmutableSelector from '@clientModulesShared/createImmutableSelector'

const vehicleEntity = state => state.getIn(['vehicle', 'vehicleEntity'])
const vehicleCurrent = state => state.getIn(['vehicle', 'vehicleStatus', 'current'])
const vehicleAll = state => state.getIn(['vehicle', 'vehicleStatus', 'all'])

const vehicleSelector = createImmutableSelector(
  [vehicleEntity, vehicleCurrent],
  (vehicles, id) => denormalizeVehicle(vehicles, id)
)

const vehicleArraySelector = createImmutableSelector(
  [vehicleEntity, vehicleAll],
  (vehicles, all) => denormalizeVehicleArray(vehicles, all)
)

export { vehicleSelector, vehicleArraySelector }
