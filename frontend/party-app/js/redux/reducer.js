import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CONTACT, UPDATE_LOCATION, LOGIN_FULFILLED, LOGIN_REJECTED, LOGOUT} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const locationReducer = (state = {
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421}, action) => {
  if (action.type === UPDATE_LOCATION) return merge(state, action.payload)
  return state
}

const locationReadyReducer = (state = false, action) => {
  if (action.type === UPDATE_LOCATION) return true
  return state
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_FULFILLED:
      return merge(state, {userData: action.payload, errMessage: null})
    case LOGIN_REJECTED:
      return merge(state, {errMessage: action.payload})
    case LOGOUT:
      return merge(state, {userData: null, errMessage: null}) 
    default:
      return state
  }
}

const readyReducer = combineReducers({
  locationReady: locationReadyReducer
})

const reducer = combineReducers({
  location: locationReducer,
  readies: readyReducer,
  user: userReducer,
})

export default reducer
