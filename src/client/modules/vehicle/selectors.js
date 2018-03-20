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
const selectedAssginer = state => {
  if (getFormValues('transportCreateForm')(state)) {
    return getFormValues('transportCreateForm')(state).get('assigner')
  }
  return getFormValues('transportCreateForm')(state)
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
      : {}
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
      : []
)

// const makeVehicleInitialValuesSelector = () =>
//   createImmutableSelector([vehicleInitialValues], vehicle => ({
//     plate: vehicle.get('plate'),
//     engine: vehicle.get('engine'),
//     model: vehicle.get('model'),
//     purchase_date: vehicle.get('purchase_date')
//       ? moment(vehicle.get('purchase_date'))
//       : vehicle.get('purchase_date'),
//     init_mile: vehicle.get('init_mile'),
//     principal: vehicle.get('principal')
//       ? `${vehicle.getIn(['principal', 'fullname'])}@@${vehicle.getIn([
//         'principal',
//         'username'
//       ])}`
//       : vehicle.get('principal'),
//     secondary: vehicle.get('secondary')
//       ? `${vehicle.getIn(['secondary', 'fullname'])}@@${vehicle.getIn([
//         'secondary',
//         'username'
//       ])}`
//       : vehicle.get('secondary')
//   }))

const makeVehicleInitialValuesSelector = () =>
  createImmutableSelector([vehicleInitialValues], vehicle => {
    const purchase = vehicle.get('purchase_date')
      ? fromJS(moment(vehicle.get('purchase_date')))
      : vehicle.get('purchase_date')
    const captain = vehicle.get('captain')
      ? fromJS(
        `${vehicle.getIn(['captain', 'username'])}@@${vehicle.getIn([
          'captain',
          'fullname'
        ])}`
      )
      : vehicle.get('captain')
    const principal = vehicle.get('principal')
      ? fromJS(
        `${vehicle.getIn(['principal', 'username'])}@@${vehicle.getIn([
          'principal',
          'fullname'
        ])})`
      )
      : vehicle.get('principal')
    const secondary = vehicle.get('secondary')
      ? fromJS(
        `${vehicle.getIn(['secondary', 'username'])}@@${vehicle.getIn([
          'secondary',
          'fullname'
        ])})`
      )
      : vehicle.get('secondary')
    return vehicle
      .set('captain', captain)
      .set('purchase_date', purchase)
      .set('principal', principal)
      .set('secondary', secondary)
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
  [availableVehicleSelector, selectedAssginer],
  (vehicles, assigner) =>
    vehicles.filter((vehicle, i) => {
      const assignerUsername = assigner ? assigner.split('@@')[0] : assigner
      return vehicle.getIn(['captain', 'username']) === assignerUsername
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
