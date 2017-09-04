import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { reducer as authReducer } from '../modules/auth'
import { reducer as companyReducer } from '../modules/company'
import { reducer as productReducer } from '../modules/product'
import routerReducer from '../route/reducer'

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  company: companyReducer,
  product: productReducer,
  form: formReducer
})
export default rootReducer
