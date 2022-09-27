import axios from '@/api/axios/index'
import { QuickRecord } from '@/types/checklist'

const getQuickRecordList = (date: string) => {
  return axios.get(`/api/v1/quick/${date}`)
}

const modifyQuickRecord = (data: QuickRecord) => {
  return axios.put(`/api/v1/quick/${data.quickId}`, data)
}

const modifyQuickRecordOrder = (data: QuickRecord) => {
  return axios.put('/api/v1/quick', data)
}

const modifyQuickRecordCount = (data: { quickId: number, date: string }) => {
  return axios.put(`/api/v1/quick/count/${data.quickId}/${data.date}`)
}

export {
  getQuickRecordList,
  modifyQuickRecord,
  modifyQuickRecordOrder,
  modifyQuickRecordCount,
}
