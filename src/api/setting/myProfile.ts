import axios from '@/api/axios/index'

const getUser = () => {
  return axios.get('/api/v1/users')
}
const putUser = (data: any) => {
  return axios.get('/api/v1/users', data)
}
const deleteUser = () => {
  return axios.get('/api/v1/users')
}
const postUserImage = (data: any) => {
  return axios.get('/api/v1/users/image', data)
}
const deletetUserImage = () => {
  return axios.delete('/api/v1/users/image')
}

// const editProfile = (data) => {
//   return axios.put('/api/v1/user', data)
// }

export { getUser, putUser, deleteUser, postUserImage, deletetUserImage }
