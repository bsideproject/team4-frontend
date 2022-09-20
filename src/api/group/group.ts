import axios from '@/api/axios/index'

const getGroupMemberList = (familyId: number) => {
  return axios.get(`/api/v1/family/${familyId}`)
}

const deleteGroup = () => {
  return axios.delete('/api/v1/family')
}

const postGroup = (managerId: number) => {
  return axios.post('/api/v1/family', { groupManagerId: managerId })
}

const postGroupMember = (managerId: number) => {
  return axios.post('/api/v1/family/members', { groupManagerId: managerId })
}

const deleteGroupMember = (data: {familyId: number, deleteMemberId:number} ) => {
  return axios.post(`/api/v1/family/${data.familyId}/members`, { deleteMemberId: data.deleteMemberId })
}

const putGroupManager = (data: { familyId: number, prevManagerId: number, nextManagerId: number }) => {
  return axios.put(`/api/v1/family/${data.familyId}/manager`, { prevManagerId: data.prevManagerId, nextManagerId: data.nextManagerId })
}

export {
  getGroupMemberList,
  deleteGroup,
  postGroup,
  postGroupMember,
  deleteGroupMember,
  putGroupManager,
}
