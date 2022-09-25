import {
  getGroupMemberList,
  deleteGroupMember,
  putGroupManager,
  postGroup,
  postGroupMember,
  deleteGroup
} from '@/api/group/group'
import { makeModuleTypes } from '@/utils/store/index'
import { Group } from '@/types/group'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'
import { Commit, Dispatch } from 'vuex'

const MODULE_NAME = 'groupStore'
const TYPES = makeModuleTypes([
  'groupList',
  'getGroupList',
  'actGroupList',
  'setGroupList',

  'actDeleteGroupMember',
  'actPutGroupManager',
  'actPostGroup',
  'actPostGroupMember',
  'actDeleteGroup'
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
    [TYPES.actGroupList]({ commit }: {commit: Commit}, payload: number) {
      return getGroupMemberList(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data} = res.data 

          if (code === '602') {
            commit(TYPES.setGroupList, data.familyMemberList.sort((a: Group, b: Group) => {
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
    [TYPES.actDeleteGroupMember]({ commit }: {commit: Commit}, payload: {familyId: number, deleteMemberId: number}) {
      return deleteGroupMember(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message} = res.data 

          if (code === '606') {
            commit(TYPES.setGroupList, [])
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.actPutGroupManager]({ dispatch }: {dispatch: Dispatch}, payload: { familyId: number, prevManagerId: number, nextManagerId: number }) {
      return putGroupManager(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data} = res.data 

          if (code === '604') {
            dispatch(TYPES.actGroupList, data.familyId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.actPostGroup]({ dispatch }: {dispatch: Dispatch}, payload: number) {
      return postGroup(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '601') {
            dispatch(TYPES.actGroupList, data.familyId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.actPostGroupMember]({ dispatch }: {dispatch: Dispatch}, payload: number) {
      return postGroupMember(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '605') {
            dispatch(TYPES.actGroupList, data.familyId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.actDeleteGroup]({ dispatch }: {dispatch: Dispatch}, payload: number) {
      return deleteGroup(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '603') {
            dispatch(TYPES.actGroupList, data.familyId)
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
