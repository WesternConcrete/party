import {loginAttempt} from '../helperJS/api'

// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const UPDATE_LOCATION = "UPDATE_LOCATION"
export const LOGIN_SENT = 'LOG_IN_SENT'
export const LOGIN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOGIN_REJECTED = 'LOG_IN_REJECTED'
export const LOGOUT = 'LOGOUT'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CHANGE_BDAY = 'CHANGE_BDAY'
export const CHANGE_IMAGE = 'CHANGE_IMAGE'



// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

export const updateLocation = location => ({
  type: UPDATE_LOCATION,
  payload: location,
})

export const changeNameAction = name => ({
  type: CHANGE_NAME,
  payload: name,
})

export const changeBday = bday => ({
  type: CHANGE_BDAY,
  payload: bday,
})

export const changeProfileImage = image => ({
  type: CHANGE_IMAGE,
  payload: image,
})

export const loginUser = (username, password) => async dispatch => {
  dispatch({type: LOGIN_SENT})
  try {
    const token = await loginAttempt(username, password)
    dispatch({type: LOGIN_FULFILLED, payload: token})
  } catch (err) {
    dispatch({type: LOGIN_REJECTED, payload: err.message})
  }
}

export const logoutUser = () => ({type: LOGOUT})