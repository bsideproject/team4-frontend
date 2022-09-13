import {
  getGroupMemberList,
  deleteGroupMember,
  putGroupManager,
} from '@/api/group/group'
import { makeModuleTypes } from '@/utils/store/index'

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

const module = {
  namespaced: true,
  state: {
    groupList: [],
  },
  getters: {
    [TYPES.getGroupList](state: any) {
      return state.groupList
    },
  },
  actions: {
    [TYPES.actGroupList](context: any, payload: any) {
      getGroupMemberList(payload)
        .then((res: any) => {
          console.log(res)

          context.commit(TYPES.setGroupList, [])
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    [TYPES.actDeleteGroupMember](context: any, payload: any) {
      deleteGroupMember(payload)
    },
    [TYPES.actPutGroupManager](context: any, payload: any) {
      putGroupManager(payload)
    },
  },
  mutations: {
    [TYPES.setGroupList](state: any, payload: any) {
      state.groupList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
