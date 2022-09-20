import {
  getGroupMemberList,
  deleteGroupMember,
  putGroupManager,
  postGroup,
  postGroupMember
} from '@/api/group/group'
import { makeModuleTypes } from '@/utils/store/index'
import { Group } from '@/types/group'
import { Success } from '@/types/response'
import { Axios, AxiosResponse } from 'axios'

const MODULE_NAME = 'groupStore'
const TYPES = makeModuleTypes([
  'groupList',
  'getGroupList',
  'actGroupList',
  'setGroupList',

  'actDeleteGroupMember',
  'actPutGroupManager',
  'actPostGroup',
  'actPostGroupMember'
])
type TYPES = typeof TYPES[keyof typeof TYPES]

interface State {
  groupList: Array<Group>
}

const module = {
  namespaced: true,
  state: {
    groupList: [],
  },
  getters: {
    [TYPES.getGroupList](state: State) {
      return state.groupList
    },
  },
  actions: {
    [TYPES.actGroupList](context: any, payload: number) {
      return getGroupMemberList(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data} = res.data 

          if (code === '602') {
            context.commit(TYPES.setGroupList, data.familyMemberList.sort((a: Group, b: Group) => {
              if (a.role > b.role) {
                return 1
              } else {
                return -1
              }
            }))    
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.actDeleteGroupMember](context: any, payload: {familyId: number, deleteMemberId: number}) {
      return deleteGroupMember(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message} = res.data 

          if (code === '606') {
            context.commit(TYPES.setGroupList, [])
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.actPutGroupManager](context: any, payload: { familyId: number, prevManagerId: number, nextManagerId: number }) {
      return putGroupManager(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data} = res.data 

          if (code === '604') {
            context.dispatch(TYPES.actGroupList, data.familyId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.actPostGroup](context: any, payload: number) {
      return postGroup(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '601') {
            context.dispatch(TYPES.actGroupList, data.familyId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.actPostGroupMember](context: any, payload: number) {
      return postGroupMember(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '605') {
            context.dispatch(TYPES.actGroupList, data.familyId)
          } else {
            throw new Error(message)
          }
        })
    }
  },
  mutations: {
    [TYPES.setGroupList](state: State, payload: Array<Group>) {
      state.groupList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
