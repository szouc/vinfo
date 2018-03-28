// @flow

import createImmutableSelector from '@clientUtils/createImmutableSelector'
import moment from 'moment'
import { getFormValues } from 'redux-form/immutable'
import { fromJS } from 'immutable'

const vehicleEntity = state => state.getIn(['entities', 'vehicles'])
const vehicleCurrent = state => state.getIn(['vehicle', 'status', 'current'])
const vehicleIds = state => state.getIn(['vehicle', 'status', 'all'])
const vehicleInitialValues = ownProps => fromJS(ownProps.vehicle)
const currentUser = state => state.getIn(['auth', 'user', 'username'])
const userEntity = state => state.getIn(['entities', 'users'])
const selectedAssigner = state => {
  if (getFormValues('transportCreateForm')(state)) {
    return getFormValues('transportCreateForm')(state).get('assigner')
  }
  return null
}

const vehicleSelector = createImmutableSelector(
  [vehicleEntity, vehicleCurrent, userEntity],
  (vehicle, current, user) =>
    current
      ? vehicle.get(current).withMutations(value =>
        value
          .updateIn(['captain'], value => user.get(value))
          .updateIn(['principal'], value => user.get(value))
          .updateIn(['secondary'], value => user.get(value))
      )
      : fromJS({})
)

const vehicleArraySelector = createImmutableSelector(
  [vehicleEntity, vehicleIds, userEntity],
  (vehicles, ids, user) =>
    ids
      ? ids.map(item =>
        vehicles.get(item).withMutations(value =>
          value
            .updateIn(['captain'], value => user.get(value))
            .updateIn(['principal'], value => user.get(value))
            .updateIn(['secondary'], value => user.get(value))
        )
      )
      : fromJS([])
)

const makeVehicleInitialValuesSelector = () =>
  createImmutableSelector([vehicleInitialValues], vehicle => {
    const purchase = vehicle.get('purchase_date')
      ? fromJS(moment(vehicle.get('purchase_date')))
      : vehicle.get('purchase_date')
    return vehicle.set('purchase_date', purchase)
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
        ? vehicle.getIn(['captain', 'username']) === assigner.get('username')
        : true
    })
)

export {
  vehicleSelector,
  vehicleArraySelector,
  vehicleArrayByUserSelector,
  availableVehicleSelector,
  availableVehicleByCaptainSelector,
  makeVehicleInitialValuesSelector
}
