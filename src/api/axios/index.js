import axios from 'axios'

const HEADERS_CONTENT_TYPE_JSON = 'application/json;charset=utf-8'
const AUTHORIZATION_TYPE = 'Bearer'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': HEADERS_CONTENT_TYPE_JSON
  }
})

instance.interceptors.request.use(
  function (config) {
    console.log('axios request interceptor', config)

    const accessToken = localStorage.getItem('userToken')
    if (accessToken) {
      config.headers.Authorization = `${AUTHORIZATION_TYPE} ${accessToken}`
      return config
    }

    delete config.headers.Authorization

    return config
  },

  function (error) {
    return Promise.reject(error)
  }
)


instance.interceptors.response.use(
  function (response) {

    return Promise.resolve(response)
  },

  function (error) {

    return Promise.reject(error)
  }
)

export default instance