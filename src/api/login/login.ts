import axios from '@/api/axios/index'

const login = (data: any) => {
  console.log('login api', data)

  return axios.post('/api/login', data)
}

export { login }
