import axios from '@/api/axios/index'
import { User } from '@/types/user'

const getUser = () => {
  return axios.get('/api/v1/users')
}
const modifyUser = (data: User) => {
  return axios.put('/api/v1/users', data)
}
const deleteUser = () => {
  return axios.delete('/api/v1/users')
}
const saveUserImage = (data: User) => {
  return axios.post('/api/v1/users/image', data)
}
const deletetUserImage = () => {
  return axios.delete('/api/v1/users/image')
}
const saveLeaveFamily = () => {
  return axios.post('/api/v1/users/family')
}
const fetchDeleteUser = () => {
  return axios.delete('/api/v1/users')
}

export { getUser, modifyUser, deleteUser, saveUserImage, deletetUserImage, saveLeaveFamily, fetchDeleteUser }
