import axios from "@/api/axios/index.js";

const login = (data) => {
  console.log('login api', data)

  return axios.post('/api/login', data)
}

export {
  login
}