import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { reducer as errorReducer } from '../modules/error'
import { reducer as authReducer } from '../modules/auth'
import { companyEntity, companyReducer } from '../modules/company'
import {
  productEntity,
  priceHistoryEntity,
  productReducer
} from '../modules/product'
// import { reducer as userReducer } from '../modules/user'
// import { reducer as vehicleReducer } from '../modules/vehicle'
// import { reducer as transportReducer } from '../modules/transport'
import routerReducer from '../route/reducer' // hack the default to immutable routerReducer

const EntitiesReducer = combineReducers({
  companies: companyEntity,
  products: productEntity,
  price_histories: priceHistoryEntity
})

const rootReducer = combineReducers({
  entities: EntitiesReducer,
  router: routerReducer,
  error: errorReducer,
  auth: authReducer,
  company: companyReducer,
  product: productReducer,
  // user: userReducer,
  // vehicle: vehicleReducer,
  // transport: transportReducer,
  form: formReducer
})
export default rootReducer
