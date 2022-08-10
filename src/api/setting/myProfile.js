import axios from "@/api/axios/index.js";

const editProfile = (data) => {
  console.log('editProfile api', data)
  const userId = 'temp'
  return axios.put(`/api/v1/user/${userId}`, data)
}

export {
    editProfile
}