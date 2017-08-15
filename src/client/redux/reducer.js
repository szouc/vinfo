import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from '../modules/auth/reducers/auth'
import { reducer as formReducer } from 'redux-form/immutable'

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  auth: authReducer
})

export default rootReducer
