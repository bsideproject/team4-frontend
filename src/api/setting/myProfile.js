import axios from '@/api/axios/index.js'

const getUser = () => {
  return axios.get('/api/v1/user')
}
const putUser = (data) => {
  return axios.get('/api/v1/user', data)
}
const deleteUser = () => {
  return axios.get('/api/v1/user')
}
const postUserImage = (data) => {
  return axios.get('/api/v1/user/image', data)
}
const deletetUserImage = () => {
  return axios.delete('/api/v1/user/image')
}

// const editProfile = (data) => {
//   return axios.put('/api/v1/user', data)
// }

export { getUser, putUser, deleteUser, postUserImage, deletetUserImage }
