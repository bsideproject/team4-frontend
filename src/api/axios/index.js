import axios from 'axios'
import { getAuthorization } from '@utils/login/index.js'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

instance.interceptors.request.use(
  function (config) {
    console.log('axios request interceptor', config)

    const authorization = getAuthorization()
    if (authorization) {
      config.headers.Authorization = authorization
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