export const API_HOME = 'http://192.168.86.29:80'
export const API_AUTHENTICATE = API_HOME + '/authenticate-user/'
export const API_CHECK_USERNAME = API_HOME + '/create-username/'
export const API_CREATE_USER = API_HOME + '/createUser/'


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
