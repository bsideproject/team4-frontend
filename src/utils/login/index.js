const AUTHORIZATION_TYPE = 'Bearer'
const TOKEN_KEY = 'sf-token'

const setToken = (token) => {
  if (token && token.startsWith(AUTHORIZATION_TYPE)) {
    localStorage.setItem(TOKEN_KEY, token.split(' ')[1])
  }
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const getAuthorization = () => {
  const token = getToken()
  if (token) {
    return `${AUTHORIZATION_TYPE} ${getToken()}`
  } else {
    return ''
  }
}
export { setToken, getToken, removeToken, getAuthorization }
