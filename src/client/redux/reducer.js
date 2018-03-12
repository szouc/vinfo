import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { reducer as authReducer } from '../modules/auth'
import { companyEntity, companyReducer } from '../modules/company'
// import { reducer as productReducer } from '../modules/product'
// import { reducer as userReducer } from '../modules/user'
// import { reducer as vehicleReducer } from '../modules/vehicle'
// import { reducer as transportReducer } from '../modules/transport'
import routerReducer from '../route/reducer' // hack the default to immutable routerReducer

const EntitiesReducer = combineReducers({
  companies: companyEntity
})

const rootReducer = combineReducers({
  entities: EntitiesReducer,
  router: routerReducer,
  auth: authReducer,
  company: companyReducer,
  // product: productReducer,
  // user: userReducer,
  // vehicle: vehicleReducer,
  // transport: transportReducer,
  form: formReducer
})
export default rootReducer
