import axios from '@/api/axios/index'
import { Pet } from '@/types/pet'

const postPet = (data: Pet) => {
  return axios.post('/api/v1/pets', data)
}

const getPetList = () => {
  return axios.get('/api/v1/pets')
}

const getPet = (petId: string) => {
  return axios.get(`/api/v1/pets/${petId}`)
}

const putMainPet = (data: Pet) => {
  return axios.put('/api/v1/pets/mainPet', data)
}

const postSharePet = (petId: string) => {
  return axios.post(`/api/v1/pets/${petId}/share`)
}

const putPet = (data: Pet) => {
  return axios.put(`/api/v1/pets/${data.petId}`, data)
}

const putDeactivatePet = (petId: string) => {
  return axios.put(`/api/v1/pets/${petId}/deactivate`)
}

const deletePet = (petId: string) => {
  return axios.delete(`/api/v1/pets/${petId}`)
}

export {
  postPet,
  getPetList,
  getPet,
  putMainPet,
  postSharePet,
  putPet,
  putDeactivatePet,
  deletePet,
}
