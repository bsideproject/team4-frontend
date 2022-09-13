import axios from '@/api/axios/index'

const getQuickRecordList = (date: any) => {
  return axios.get(`/api/v1/quick/${date}`)
}

const putQuickRecord = (quickId: any) => {
  return axios.put(`/api/v1/quick/${quickId}`)
}

const putQuickRecordOrder = (data: any) => {
  return axios.put('/api/v1/quick', data)
}

const putQuickRecordCount = (quickId: any) => {
  return axios.put(`/api/v1/quick/count/${quickId}`)
}

export {
  getQuickRecordList,
  putQuickRecord,
  putQuickRecordOrder,
  putQuickRecordCount,
}
