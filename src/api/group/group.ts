import axios from '@/api/axios/index'

const getGroupMemberList = (familyId: string) => {
  return axios.get(`/api/v1/family/${familyId}`)
}

const deleteGroup = () => {
  return axios.delete('/api/v1/family')
}

const postGroupMember = () => {
  return axios.post('/api/v1/family/members')
}

const deleteGroupMember = (userId: string) => {
  return axios.delete('/api/v1/family/members')
}

const putGroupManager = (userId: string) => {
  return axios.put('/api/v1/family/manager')
}

export {
  getGroupMemberList,
  deleteGroup,
  postGroupMember,
  deleteGroupMember,
  putGroupManager,
}
