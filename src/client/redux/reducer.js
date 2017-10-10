import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { reducer as authReducer } from '../modules/auth'
import { reducer as companyReducer } from '../modules/company'
import { reducer as productReducer } from '../modules/product'
import { reducer as userReducer } from '../modules/user'
import { reducer as vehicleReducer } from '../modules/vehicle'
import { reducer as transportReducer } from '../modules/transport'
import routerReducer from '../route/reducer' // hack the default to immutable routerReducer

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  company: companyReducer,
  product: productReducer,
  user: userReducer,
  vehicle: vehicleReducer,
  transport: transportReducer,
  form: formReducer
})
export default rootReducer
