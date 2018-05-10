// @flow

import createImmutableSelector from '@clientUtils/createImmutableSelector'
import moment from 'moment'
import { getFormValues } from 'redux-form/immutable'
import { fromJS } from 'immutable'

const vehicleEntity = state => state.getIn(['entities', 'vehicles'])
const vehicleCurrent = state => state.getIn(['vehicle', 'status', 'current'])
const vehicleIds = state => state.getIn(['vehicle', 'status', 'all'])
const selectIds = state => state.getIn(['vehicle', 'status', 'selectIds'])
const vehicleInitialValues = ownProps => fromJS(ownProps.vehicle)
const currentUser = state => state.getIn(['auth', 'user', 'username'])
const selectedAssigner = state => {
  if (getFormValues('transportCreateForm')(state)) {
    return getFormValues('transportCreateForm')(state).get('assigner')
  }
  return null
}

const vehicleSelector = createImmutableSelector(
  [vehicleEntity, vehicleCurrent],
  (vehicle, current) => vehicle.get(current)
)

const vehicleArraySelector = createImmutableSelector(
  [vehicleEntity, vehicleIds],
  (vehicles, ids) => ids.map(item => vehicles.get(item))
)

const vehicleSelectSelector = createImmutableSelector(
  [vehicleEntity, selectIds],
  (vehicles, ids) => ids.map(item => vehicles.get(item))
)

const makeVehicleInitialValuesSelector = () =>
  createImmutableSelector([vehicleInitialValues], vehicle => {
    const purchase = vehicle.get('purchaseDate')
      ? fromJS(moment(vehicle.get('purchaseDate')))
      : vehicle.get('purchaseDate')
    return vehicle.set('purchaseDate', purchase)
  })

const vehicleArrayByUserSelector = createImmutableSelector(
  [vehicleArraySelector, currentUser],
  (vehicles, username) =>
    vehicles.filter((vehicle, i) => {
      if (vehicle.get('principal') || vehicle.get('secondary')) {
        return (
          vehicle.getIn(['principal', 'username']) === username ||
          vehicle.getIn(['secondary', 'username']) === username
        )
      }
      return false
    })
)

const availableVehicleSelector = createImmutableSelector(
  [vehicleArraySelector],
  vehicles => vehicles.filter((vehicle, i) => !vehicle.get('assigned'))
)

const availableVehicleByCaptainSelector = createImmutableSelector(
  [availableVehicleSelector, selectedAssigner],
  (vehicles, assigner) =>
    vehicles.filter((vehicle, i) => {
      return assigner
        ? vehicle.getIn(['captain', 'username']) === assigner
        : true
    })
)

export {
  vehicleSelector,
  vehicleArraySelector,
  vehicleSelectSelector,
  vehicleArrayByUserSelector,
  availableVehicleSelector,
  availableVehicleByCaptainSelector,
  makeVehicleInitialValuesSelector
}
