import axios from '@/api/axios/index.js'

const getQuickRecordList = (date) => {
  return axios.get(`/api/v1/quick/${date}`)
}

const putQuickRecord = (quickId) => {
  return axios.put(`/api/v1/quick/${quickId}`)
}

const putQuickRecordOrder = (data) => {
  return axios.put('/api/v1/quick', data)
}

const putQuickRecordCount = (quickId) => {
  return axios.put(`/api/v1/quick/count/${quickId}`)
}

export {
  getQuickRecordList,
  putQuickRecord,
  putQuickRecordOrder,
  putQuickRecordCount,
}
