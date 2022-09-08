import axios from '@/api/axios/index.js'

const postPet = (data) => {
  return axios.post('/api/v1/pets', data)
}

const getPetList = () => {
  return axios.get('/api/v1/pets')
}

const getPet = (petId) => {
  return axios.get(`/api/v1/pets/${petId}`)
}

const putMainPet = (data) => {
  return axios.put('/api/v1/pets/mainPet', data)
}

const postSharePet = (petId) => {
  return axios.post(`/api/v1/pets/${petId}/share`)
}

export { postPet, getPetList, getPet, putMainPet, postSharePet }
