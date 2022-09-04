import axios from '@/api/axios/index.js'

const selectProfile = () => {
  return axios.get('/api/v1/user')
}

const editProfile = (data) => {
  return axios.put('/api/v1/user', data)
}

export { selectProfile, editProfile }
