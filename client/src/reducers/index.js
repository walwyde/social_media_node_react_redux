import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import post from './post'

 const rootReducer=combineReducers({
  alert,
  post,
  profile,
  auth
})

export default rootReducer