export const API_HOME = 'http://10.144.85.243:80'
const API_AUTHENTICATE = API_HOME + '/authenticate-user/'
const API_CHECK_USERNAME = API_HOME + '/create-username/'
const API_CREATE_USER = API_HOME + '/createUser/'
const API_CHANGE_NAME = API_HOME + '/changeName/'
const API_CHANGE_BDAY = API_HOME + '/changeBirthday/'
const API_PROFILE_PIC = API_HOME + '/changeImage/'
const API_GET_FRIEND_INFO = API_HOME + '/getFriendInfo/'
const API_UPDATE_FRIENDS = API_HOME + '/updateFriends/'
const API_FORMAT_FRIEND_DATA = API_HOME + '/formatFriendData/'
const API_FIND_FRIENDS = API_HOME + '/findFriends/'
const API_GET_FRIEND_REQUESTS = API_HOME + '/getFriendRequests/'

const createFormData = (image, username) => {
  const data = new FormData();

  data.append("user", username)

  data.append('profile_image', {
    uri: image.uri, // your file path string
    name: username+ '.jpg',
    type: 'image/jpg'
  })


  return data;
};


export const loginAttempt = async (username, password) => {
  const response = await fetch(API_AUTHENTICATE, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username, password}),
  })
  const json = await response.json()
  if (json.user) {
    return {...json.user}
  }
  throw new Error(json.errMessage)
}

export const checkUsername = async (username) => {
  const response = await fetch(API_CHECK_USERNAME, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username}),
  })
  const json = await response.json()
  return json
}

export const createUser = async (userData) => {
  const response = await fetch(API_CREATE_USER, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(userData),
  })
  const json = await response.json()
  return json
}

export const changeName = async (username, name) => {
  const response = await fetch(API_CHANGE_NAME, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username: username, name: name}),
  })
  const json = await response.json()
  return json
}

export const changeBirthday = async (username, birthday) => {
  const response = await fetch(API_CHANGE_BDAY, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username: username, birthday: birthday}),
  })
  const json = await response.json()
  return json
}

export const changeImage = async (image, username) => {
  const response = await fetch(API_PROFILE_PIC, {
    method: 'POST',
    headers: {'content-type': 'multipart/form-data'},
    body: createFormData(image, username),
  })
  const json = await response.json()
  return json
}

export const getFriendInfo = async (username) => {
  const response = await fetch(API_GET_FRIEND_INFO, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username: username}),
  })
  const json = await response.json()  
  return json
}

export const updateFriends = async (username) => {
  const response = await fetch(API_UPDATE_FRIENDS, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username: username}),
  })
  const json = await response.json()  
  return json
}

export const formatFriendData = async (friends) => {
  const response = await fetch(API_FORMAT_FRIEND_DATA, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({friends}),
  })
  const json = await response.json()  
  return json
}

export const findFriends = async (search) => {
  const response = await fetch(API_FIND_FRIENDS, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({search}),
  })
  const json = await response.json()  
  return json
}

export const getFriendRequests = async (username) => {
  const response = await fetch(API_GET_FRIEND_REQUESTS, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username}),
  })
  const json = await response.json()  
  return json
}



