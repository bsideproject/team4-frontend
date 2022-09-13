import axios from '@/api/axios/index'

const postPet = (data: any) => {
  return axios.post('/api/v1/pets', data)
}

const getPetList = () => {
  return axios.get('/api/v1/pets')
}

const getPet = (petId: any) => {
  return axios.get(`/api/v1/pets/${petId}`)
}

const putMainPet = (data: any) => {
  return axios.put('/api/v1/pets/mainPet', data)
}

const postSharePet = (petId: any) => {
  return axios.post(`/api/v1/pets/${petId}/share`)
}

const putPet = (data: any) => {
  return axios.put(`/api/v1/pets/${data.petId}`, data)
}

const putDeactivatePet = (petId: any) => {
  return axios.put(`/api/v1/pets/${petId}/deactivate`)
}

const deletePet = (petId: any) => {
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
