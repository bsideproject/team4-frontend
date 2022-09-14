import {
  getGroupMemberList,
  deleteGroupMember,
  putGroupManager,
} from '@/api/group/group'
import { makeModuleTypes } from '@/utils/store/index'
import { Group } from '@/types/group'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'

const MODULE_NAME = 'groupStore'
const TYPES = makeModuleTypes([
  'groupList',
  'getGroupList',
  'actGroupList',
  'setGroupList',

  'actDeleteGroupMember',
  'actPutGroupManager',
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
      getGroupMemberList(payload)
        .then((res: AxiosResponse<Success>) => {
          console.log(res)

          context.commit(TYPES.setGroupList, [])
        })
    },
    [TYPES.actDeleteGroupMember](context: any, payload: number) {
      deleteGroupMember(payload)
    },
    [TYPES.actPutGroupManager](context: any, payload: number) {
      putGroupManager(payload)
    },
  },
  mutations: {
    [TYPES.setGroupList](state: State, payload: Array<Group>) {
      state.groupList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
