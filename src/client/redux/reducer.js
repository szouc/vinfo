import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form/immutable'
import { reducer as authReducer } from '../modules/auth'

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  form: formReducer
})
export default rootReducer
