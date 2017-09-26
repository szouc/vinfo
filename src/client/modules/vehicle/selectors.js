// @flow

import { denormalizeVehicle, denormalizeVehicleArray } from './schema'
import createImmutableSelector from '@clientModulesShared/createImmutableSelector'
import moment from 'moment'
import { fromJS } from 'immutable'

const vehicleEntity = state => state.getIn(['vehicle', 'vehicleEntity'])
const vehicleCurrent = state =>
  state.getIn(['vehicle', 'vehicleStatus', 'current'])
const vehicleAll = state => state.getIn(['vehicle', 'vehicleStatus', 'all'])
const vehicleInitialValues = ownProps => fromJS(ownProps.vehicle)
const currentUser = state => state.getIn(['auth', 'user', 'username'])

const vehicleSelector = createImmutableSelector(
  [vehicleEntity, vehicleCurrent],
  (vehicles, id) => denormalizeVehicle(vehicles, id)
)

const vehicleArraySelector = createImmutableSelector(
  [vehicleEntity, vehicleAll],
  (vehicles, all) => denormalizeVehicleArray(vehicles, all)
)

const makeVehicleInitialValuesSelector = () =>
  createImmutableSelector([vehicleInitialValues], vehicle => ({
    plate: vehicle.get('plate'),
    engine: vehicle.get('engine'),
    model: vehicle.get('model'),
    purchase_date: vehicle.get('purchase_date')
      ? moment(vehicle.get('purchase_date'))
      : vehicle.get('purchase_date'),
    init_mile: vehicle.get('init_mile'),
    principal: vehicle.get('principal')
      ? `${vehicle.getIn(['principal', 'fullname'])}@@${vehicle.getIn([
        'principal',
        'username'
      ])}`
      : vehicle.get('principal'),
    secondary: vehicle.get('secondary')
      ? `${vehicle.getIn(['secondary', 'fullname'])}@@${vehicle.getIn([
        'secondary',
        'username'
      ])}`
      : vehicle.get('secondary')
  }))

const vehicleArrayByUserSelector = createImmutableSelector(
  [vehicleArraySelector, currentUser],
  (vehicles, username) =>
    vehicles.filter(
      (vehicle, i) =>
        vehicle.getIn(['principal', 'username']) === username ||
        vehicle.getIn(['secondary', 'username']) === username
    )
)

export {
  vehicleSelector,
  vehicleArraySelector,
  vehicleArrayByUserSelector,
  makeVehicleInitialValuesSelector
}
