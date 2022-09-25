import axios from '@/api/axios/index'
import { OneLineDiary } from '@/types/oneLineDiary'

const getOneLineDiaryList = (petId: number) => {
  return axios.get(`/api/v1/pet/${petId}/diaries`)
}
const saveOneLineDiary = (data: OneLineDiary) => {
  return axios.post(`/api/v1/pet/${data.petId}/diaries`, { contents: data.contents })
}
const modifyOneLineDiary = (data: OneLineDiary) => {
  return axios.put(`/api/v1/pet/${data.petId}/diaries/${data.diaryId}`, data)
}
const deleteOneLineDiary = ({ petId, diaryId }: { petId: number, diaryId: number }) => {
  return axios.delete(`/api/v1/pet/${petId}/diaries/${diaryId}`)
}

export {
  getOneLineDiaryList, saveOneLineDiary, modifyOneLineDiary, deleteOneLineDiary
}