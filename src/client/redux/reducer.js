import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { reducer as authReducer } from '../modules/auth'
import { reducer as companyReducer } from '../modules/company'
import routerReducer from '../route/reducer'

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  company: companyReducer,
  form: formReducer
})
export default rootReducer
