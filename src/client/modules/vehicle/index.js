import {
  fuelsEntity,
  maintainEntity,
  vehicleEntity,
  vehicleReducer
} from './reducers'
import saga from './sagas'

export const MODULE_NAME = 'VEHICLE'

export { fuelsEntity, maintainEntity, vehicleEntity, vehicleReducer, saga }
