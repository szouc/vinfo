import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { reducer as authReducer } from '../modules/auth'
import routerReducer from '../route/reducer'

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  form: formReducer
})
export default rootReducer
