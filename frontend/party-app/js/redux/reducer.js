import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CONTACT, UPDATE_LOCATION, LOGIN_FULFILLED, LOGIN_REJECTED, LOGOUT, CHANGE_NAME, CHANGE_BDAY, CHANGE_IMAGE, REPLACE_FRIENDS, ASSIGN_FRIENDDATA, ASSIGN_FRIEND_REQUESTS} from './actions'

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
      return merge({...action.payload, errMessage: null})
    case LOGIN_REJECTED:
      return merge({errMessage: action.payload})
    case LOGOUT:
      return merge({errMessage: null}) 
    case CHANGE_NAME:
      return merge(state, {first_name: action.payload})
    case CHANGE_BDAY:
      return merge(state, {birthday: action.payload})
    default:
      return state
  }
}
//
const assignParties =  (state = [], action) => {
  if (action.type === LOGIN_FULFILLED) return action.payload.attending_parties
  if (action.type === LOGOUT) return []
  return state
}

const assignBirthday =  (state = null, action) => {
  if (action.type === LOGIN_FULFILLED) return action.payload.birthday
  if (action.type === CHANGE_BDAY) return action.payload
  if (action.type === LOGOUT) return null
  return state
}

const loginErrMessage = (state = null, action) => {

  if (action.type === LOGIN_REJECTED) return action.payload
  if (action.type === LOGOUT || action.type === LOGIN_FULFILLED) return null
  return state
}

const assignUser =  (state = null, action) => {
  if (action.type === LOGIN_FULFILLED) return action.payload.user
  if (action.type === LOGOUT) return null
  return state
}

const assignProfileImage =  (state = null, action) => {
  if (action.type === LOGIN_FULFILLED) return action.payload.profile_image
  if (action.type === CHANGE_IMAGE) return action.payload
  if (action.type === LOGOUT) return null
  return state
}

const assignName = (state = null, action) => {
  if (action.type === LOGIN_FULFILLED) return action.payload.first_name
  if (action.type === CHANGE_NAME) return action.payload
  if (action.type === LOGOUT) return null
  return state
}

const assignFriends =  (state = [], action) => {
  if (action.type === LOGIN_FULFILLED) return action.payload.friends
  if (action.type === LOGOUT) return []
  if (action.type === REPLACE_FRIENDS) return action.payload
  return state
}

const assignFriendData =  (state = [], action) => {
  if (action.type === ASSIGN_FRIENDDATA) return action.payload
  return state
}

const assignGroups =  (state = [], action) => {
  if (action.type === LOGIN_FULFILLED) return action.payload.groups
  if (action.type === LOGOUT) return []
  return state
}

const assignFriendRequests =  (state = [], action) => {
  if (action.type === ASSIGN_FRIEND_REQUESTS) return action.payload
  return state
}


const combinedUserReducer = combineReducers({
  attending_parties: assignParties,
  birthday: assignBirthday,
  user: assignUser,
  profile_image: assignProfileImage,
  first_name: assignName,
  friends: assignFriends,
  groups: assignGroups,
  errMessage: loginErrMessage,
  friendData: assignFriendData,
})

// blocked: 
// blocked_by:
// errMessage: 
// first_name: 
// friends: 
// groups:
// hidden_parties: 
// id:
// invited_parties:
// last_latitude: 
// last_longitude: 
// my_parties: 
// pending_friend_requests: 
// profile_image:
// user: 

const readyReducer = combineReducers({
  locationReady: locationReadyReducer
})

const reducer = combineReducers({
  location: locationReducer,
  readies: readyReducer,
  user: combinedUserReducer,
  friendRequests: assignFriendRequests
})

export default reducer
