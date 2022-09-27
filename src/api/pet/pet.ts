import axios from '@/api/axios/index'
import { Pet } from '@/types/pet'

const getPetList = () => {
  return axios.get('/api/v1/pets')
}
const getPet = (petId: string) => {
  return axios.get(`/api/v1/pets/${petId}`)
}
const modifyMainPet = (data: Pet) => {
  return axios.put('/api/v1/pets/mainPet', data)
}
const saveSharePet = (petId: string) => {
  return axios.post(`/api/v1/pets/${petId}/share`)
}
const savePet = (data: Pet) => {
  return axios.post('/api/v1/pets', data)
}
const modifyPet = (data: Pet) => {
  return axios.put(`/api/v1/pets/${data.petId}`, data)
}
const modifyDeactivatePet = (petId: string) => {
  return axios.put(`/api/v1/pets/${petId}/deactivate`)
}
const deletePet = (petId: string) => {
  return axios.delete(`/api/v1/pets/${petId}`)
}

export {
  getPetList,
  getPet,
  modifyMainPet,
  saveSharePet,
  savePet,
  modifyPet,
  modifyDeactivatePet,
  deletePet
}
