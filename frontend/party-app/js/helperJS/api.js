export const API_HOME = 'http://192.168.86.29:80'
export const API_AUTHENTICATE = API_HOME + '/authenticate-user/'
export const API_CHECK_USERNAME = API_HOME + '/create-username/'
export const API_CREATE_USER = API_HOME + '/createUser/'
export const API_CHANGE_NAME = API_HOME + '/changeName/'
export const API_CHANGE_BDAY = API_HOME + '/changeBirthday/'
export const API_PROFILE_PIC = API_HOME + '/changeImage/'


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

