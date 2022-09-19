import axios from '@/api/axios/index'
import { QuickRecord } from '@/types/checklist'

const getQuickRecordList = (date: string) => {
  return axios.get(`/api/v1/quick/${date}`)
}

const putQuickRecord = (data: QuickRecord) => {
  return axios.put(`/api/v1/quick/${data.quickId}`, data)
}

const putQuickRecordOrder = (data: any) => {
  return axios.put('/api/v1/quick', data)
}

const putQuickRecordCount = (data: { quickId: number, date: string }) => {
  return axios.put(`/api/v1/quick/count/${data.quickId}/${data.date}`)
}

export {
  getQuickRecordList,
  putQuickRecord,
  putQuickRecordOrder,
  putQuickRecordCount,
}
