import axios from '@/api/axios/index.js'

const getQuickRecordList = () => {
  return axios.get('/api/v1/quick')
}

const putQuickRecord = (quickId) => {
  return axios.put(`/api/v1/quick/${quickId}`)
}

const putQuickRecordOrder = (data) => {
  return axios.put('/api/v1/quick', data)
}

const putQuickRecordCount = (quickId) => {
  return axios.put(`/api/v1/quick/${quickId}`)
}

export {
  getQuickRecordList,
  putQuickRecord,
  putQuickRecordOrder,
  putQuickRecordCount,
}
