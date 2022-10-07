import axios from '@/api/axios/index'

const saveFeedback = (data: { contents: string }) => {
  return axios.post('/api/v1/feedback', data)
}

export { saveFeedback }
