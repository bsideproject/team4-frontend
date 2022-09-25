import axios from '@/api/axios/index'
import { User } from '@/types/user'

const getUser = () => {
  return axios.get('/api/v1/users')
}
const putUser = (data: User) => {
  return axios.put('/api/v1/users', data)
}
const deleteUser = () => {
  return axios.delete('/api/v1/users')
}
const postUserImage = (data: User) => {
  return axios.post('/api/v1/users/image', data)
}
const deletetUserImage = () => {
  return axios.delete('/api/v1/users/image')
}
const postleaveFamily = () => {
  return axios.post('/api/v1/users/family')
}

export { getUser, putUser, deleteUser, postUserImage, deletetUserImage, postleaveFamily }
