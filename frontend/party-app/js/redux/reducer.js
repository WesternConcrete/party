import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CONTACT, UPDATE_LOCATION, LOGIN_SUCCESS} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
    default:
      return state
  }
}

const locationReducer = (state = {
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421}, action) => {
  if (action.type === UPDATE_LOCATION) return merge(state, action.payload)
  return state
}

const loginReducer = (state = false, action) => {
  if (action.type === LOGIN_SUCCESS) return action.payload
  return state
}

const locationReadyReducer = (state = false, action) => {
  if (action.type === UPDATE_LOCATION) return true
  return state
}

const readyReducer = combineReducers({
  locationReady: locationReadyReducer
})

const reducer = combineReducers({
  location: locationReducer,
  readies: readyReducer,
  loggedIn: loginReducer,
})

export default reducer
