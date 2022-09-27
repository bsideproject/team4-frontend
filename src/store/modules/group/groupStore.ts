import {
  getGroupMemberList,
  deleteGroupMember,
  saveGroup,
  saveGroupMember,
  modifyGroupManager,
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
  
  'fetchGetGroupMemberList',
  'fetchDeleteGroupMember',
  'fetchMofiyGroupManager',
  'fetchSaveGroup',
  'fetchSaveGroupMember',
  'fetchDeleteGroup',

  'setGroupList'
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
    [TYPES.fetchGetGroupMemberList]({ commit }: {commit: Commit}, payload: number) {
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
    [TYPES.fetchDeleteGroupMember]({ commit }: {commit: Commit}, payload: {familyId: number, deleteMemberId: number}) {
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
    [TYPES.fetchMofiyGroupManager]({ dispatch }: {dispatch: Dispatch}, payload: { familyId: number, prevManagerId: number, nextManagerId: number }) {
      return modifyGroupManager(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data} = res.data 

          if (code === '604') {
            dispatch(TYPES.fetchGetGroupMemberList, data.familyId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.fetchSaveGroup]({ dispatch }: {dispatch: Dispatch}, payload: number) {
      return saveGroup(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '601') {
            dispatch(TYPES.fetchGetGroupMemberList, data.familyId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.fetchSaveGroupMember]({ dispatch }: {dispatch: Dispatch}, payload: number) {
      return saveGroupMember(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '605') {
            dispatch(TYPES.fetchGetGroupMemberList, data.familyId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.fetchDeleteGroup]({ dispatch }: {dispatch: Dispatch}, payload: number) {
      return deleteGroup(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '603') {
            dispatch(TYPES.fetchGetGroupMemberList, data.familyId)
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
